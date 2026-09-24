"use client";

import { useEffect, useRef } from "react";

export const NETWORK_VISUAL_CONFIG = {
  horizontalSpeed: 5,
  layerSpacing: 214,
  mobileLayerSpacing: 158,
  desktopNeuronRange: [5, 8] as const,
  mobileNeuronRange: [4, 6] as const,
  maxPulsesDesktop: 36,
  maxPulsesTablet: 22,
  maxPulsesMobile: 12,
  pulseIntervalMinimum: 0.1,
  pulseIntervalVariation: 0.24,
  connectionActivityGain: 2.6,
  connectionActivityDecay: 0.12,
  activeConnectionOpacity: 0.88,
  connectionOpacity: 0.42,
  connectionWidth: 1.3,
  neuronOpacity: 0.94,
  desktopNeuronRadius: 10,
  mobileNeuronRadius: 5.8,
  nodeLineWidth: 1.7,
  maximumGlow: 0.9,
  connectionColor: "76, 211, 226",
  neuronColor: "108, 235, 244",
  activeColor: "232, 255, 255",
  lightCenterX: 0.7,
  lightCenterY: 0.3,
  lightRadius: 0.78,
  lightIntensity: 0.94,
} as const;

type Point = { x: number; y: number };

type Neuron = {
  yRatio: number;
  baseIntensity: number;
  phase: number;
  frequency: number;
  activation: number;
};

type Layer = {
  index: number;
  neurons: Neuron[];
};

type Connection = {
  fromLayer: number;
  fromNeuron: number;
  toNeuron: number;
  weight: number;
  phase: number;
  frequency: number;
  activity: number;
};

type Pulse = {
  connection: Connection;
  progress: number;
  speed: number;
  intensity: number;
  generations: number;
};

type NetworkState = {
  width: number;
  height: number;
  dpr: number;
  offset: number;
  elapsed: number;
  nextPulseIn: number;
  layerCache: Map<number, Layer>;
  connectionCache: Map<number, Connection[]>;
  pulses: Pulse[];
  randomState: number;
};

const TAU = Math.PI * 2;

function hash01(value: number) {
  let hashed = value | 0;
  hashed = Math.imul(hashed ^ (hashed >>> 16), 0x45d9f3b);
  hashed = Math.imul(hashed ^ (hashed >>> 16), 0x45d9f3b);
  hashed ^= hashed >>> 16;
  return (hashed >>> 0) / 4294967295;
}

function random(state: NetworkState) {
  let value = state.randomState || 0x7f4a7c15;
  value ^= value << 13;
  value ^= value >>> 17;
  value ^= value << 5;
  state.randomState = value >>> 0;
  return state.randomState / 4294967296;
}

function layerSpacing(width: number) {
  if (width < 560) return NETWORK_VISUAL_CONFIG.mobileLayerSpacing;
  if (width < 900) return 182;
  return NETWORK_VISUAL_CONFIG.layerSpacing;
}

function neuronRange(width: number) {
  return width < 720
    ? NETWORK_VISUAL_CONFIG.mobileNeuronRange
    : NETWORK_VISUAL_CONFIG.desktopNeuronRange;
}

function maximumPulses(width: number) {
  if (width < 560) return NETWORK_VISUAL_CONFIG.maxPulsesMobile;
  if (width < 980) return NETWORK_VISUAL_CONFIG.maxPulsesTablet;
  return NETWORK_VISUAL_CONFIG.maxPulsesDesktop;
}

function getLayer(state: NetworkState, index: number) {
  const cached = state.layerCache.get(index);
  if (cached) return cached;

  const [minimum, maximum] = neuronRange(state.width);
  const count = minimum + Math.floor(hash01(index * 97 + 13) * (maximum - minimum + 1));
  const neurons = Array.from({ length: count }, (_, neuronIndex) => {
    const seed = index * 977 + neuronIndex * 131;
    const regular = count === 1 ? 0.5 : neuronIndex / (count - 1);
    return {
      yRatio: 0.12 + regular * 0.36 + (hash01(index * 17) - 0.5) * 0.045,
      baseIntensity: 0.82 + hash01(seed + 2) * 0.18,
      phase: hash01(seed + 3) * TAU,
      frequency: 0.12 + hash01(seed + 4) * 0.16,
      activation: 0,
    };
  });

  const layer = { index, neurons };
  state.layerCache.set(index, layer);
  return layer;
}

function getConnections(state: NetworkState, layerIndex: number) {
  const cached = state.connectionCache.get(layerIndex);
  if (cached) return cached;

  const source = getLayer(state, layerIndex);
  const target = getLayer(state, layerIndex + 1);
  const connections: Connection[] = [];

  source.neurons.forEach((neuron, fromNeuron) => {
    const orderedTargets = target.neurons
      .map((candidate, toNeuron) => ({
        toNeuron,
        distance: Math.abs(candidate.yRatio - neuron.yRatio),
      }))
      .sort((a, b) => a.distance - b.distance);
    const desired = state.width < 560 ? 3 : 5 + (hash01(layerIndex * 211 + fromNeuron) > 0.52 ? 1 : 0);
    const nearTargets = orderedTargets.slice(0, Math.min(3, target.neurons.length));
    const distantTargets = orderedTargets
      .slice(3)
      .sort((a, b) => (
        hash01(layerIndex * 313 + fromNeuron * 37 + a.toNeuron)
        - hash01(layerIndex * 313 + fromNeuron * 37 + b.toNeuron)
      ));
    const selectedTargets = [
      ...nearTargets,
      ...distantTargets.slice(0, Math.max(0, Math.min(desired, target.neurons.length) - nearTargets.length)),
    ];

    selectedTargets.forEach(({ toNeuron }, order) => {
      const seed = layerIndex * 1531 + fromNeuron * 89 + toNeuron * 17 + order;
      connections.push({
        fromLayer: layerIndex,
        fromNeuron,
        toNeuron,
        weight: 0.52 + hash01(seed + 5) * 0.48,
        phase: hash01(seed + 6) * TAU,
        frequency: 0.045 + hash01(seed + 7) * 0.055,
        activity: 0,
      });
    });
  });

  state.connectionCache.set(layerIndex, connections);
  return connections;
}

function layerX(state: NetworkState, index: number) {
  return index * layerSpacing(state.width) + state.offset;
}

function neuronPoint(state: NetworkState, layerIndex: number, neuronIndex: number): Point {
  const layer = getLayer(state, layerIndex);
  const neuron = layer.neurons[neuronIndex];
  return {
    x: layerX(state, layerIndex),
    y: neuron.yRatio * state.height,
  };
}

function bezierControls(from: Point, to: Point) {
  const distance = to.x - from.x;
  return {
    p0: from,
    p1: { x: from.x + distance * 0.42, y: from.y },
    p2: { x: from.x + distance * 0.58, y: to.y },
    p3: to,
  };
}

function bezierPoint(points: ReturnType<typeof bezierControls>, progress: number): Point {
  const inverse = 1 - progress;
  const inverseSquared = inverse * inverse;
  const progressSquared = progress * progress;
  return {
    x:
      inverseSquared * inverse * points.p0.x +
      3 * inverseSquared * progress * points.p1.x +
      3 * inverse * progressSquared * points.p2.x +
      progressSquared * progress * points.p3.x,
    y:
      inverseSquared * inverse * points.p0.y +
      3 * inverseSquared * progress * points.p1.y +
      3 * inverse * progressSquared * points.p2.y +
      progressSquared * progress * points.p3.y,
  };
}

function connectionPoints(state: NetworkState, connection: Connection) {
  return bezierControls(
    neuronPoint(state, connection.fromLayer, connection.fromNeuron),
    neuronPoint(state, connection.fromLayer + 1, connection.toNeuron),
  );
}

function visibleLayerRange(state: NetworkState) {
  const spacing = layerSpacing(state.width);
  return {
    first: Math.floor((-state.offset - spacing) / spacing),
    last: Math.ceil((state.width - state.offset + spacing) / spacing),
  };
}

function spawnPulse(state: NetworkState) {
  if (state.pulses.length >= maximumPulses(state.width)) return;
  const { first, last } = visibleLayerRange(state);
  const layerIndex = first + 1 + Math.floor(random(state) * Math.max(1, last - first - 2));
  const connections = getConnections(state, layerIndex);
  if (!connections.length) return;
  const connection = connections[Math.floor(random(state) * connections.length)];
  state.pulses.push({
    connection,
    progress: random(state) * 0.18,
    speed: 0.48 + random(state) * 0.34,
    intensity: 0.56 + random(state) * 0.4,
    generations: 2 + Math.floor(random(state) * 5),
  });
}

function continuePulse(state: NetworkState, pulse: Pulse) {
  const arrivedLayer = pulse.connection.fromLayer + 1;
  const arrivedNeuron = getLayer(state, arrivedLayer).neurons[pulse.connection.toNeuron];
  arrivedNeuron.activation = Math.min(1, arrivedNeuron.activation + pulse.intensity * 0.8);

  if (pulse.generations <= 0 || random(state) < 0.2) return false;
  const outgoing = getConnections(state, arrivedLayer).filter(
    (connection) => connection.fromNeuron === pulse.connection.toNeuron,
  );
  if (!outgoing.length) return false;

  pulse.connection = outgoing[Math.floor(random(state) * outgoing.length)];
  pulse.progress = 0;
  pulse.speed *= 0.94 + random(state) * 0.12;
  pulse.intensity *= 0.9;
  pulse.generations -= 1;
  return true;
}

function drawConnections(
  context: CanvasRenderingContext2D,
  state: NetworkState,
  first: number,
  last: number,
  deltaSeconds: number,
) {
  const baseLineWidth = state.width < 560
    ? NETWORK_VISUAL_CONFIG.connectionWidth * 0.78
    : NETWORK_VISUAL_CONFIG.connectionWidth;

  for (let layerIndex = first; layerIndex < last; layerIndex += 1) {
    for (const connection of getConnections(state, layerIndex)) {
      connection.activity = Math.max(
        0,
        connection.activity - deltaSeconds * NETWORK_VISUAL_CONFIG.connectionActivityDecay,
      );
      const points = connectionPoints(state, connection);
      const learningVariation = 0.78 + Math.sin(state.elapsed * connection.frequency + connection.phase) * 0.22;
      const alpha = Math.min(
        0.94,
        NETWORK_VISUAL_CONFIG.connectionOpacity * connection.weight * learningVariation
          + connection.activity * NETWORK_VISUAL_CONFIG.activeConnectionOpacity,
      );

      if (connection.activity > 0.035) {
        context.beginPath();
        context.moveTo(points.p0.x, points.p0.y);
        context.bezierCurveTo(points.p1.x, points.p1.y, points.p2.x, points.p2.y, points.p3.x, points.p3.y);
        context.strokeStyle = `rgba(${NETWORK_VISUAL_CONFIG.neuronColor}, ${connection.activity * 0.42})`;
        context.lineWidth = baseLineWidth * (2.6 + connection.activity * 1.7);
        context.stroke();
      }

      context.beginPath();
      context.moveTo(points.p0.x, points.p0.y);
      context.bezierCurveTo(points.p1.x, points.p1.y, points.p2.x, points.p2.y, points.p3.x, points.p3.y);
      context.strokeStyle = `rgba(${NETWORK_VISUAL_CONFIG.connectionColor}, ${alpha})`;
      context.lineWidth = baseLineWidth * (1 + connection.activity * 0.45);
      context.stroke();
    }
  }
}

function drawNeurons(
  context: CanvasRenderingContext2D,
  state: NetworkState,
  first: number,
  last: number,
  deltaSeconds: number,
) {
  const radius = state.width < 560
    ? NETWORK_VISUAL_CONFIG.mobileNeuronRadius
    : NETWORK_VISUAL_CONFIG.desktopNeuronRadius;

  for (let layerIndex = first; layerIndex <= last; layerIndex += 1) {
    const layer = getLayer(state, layerIndex);
    const x = layerX(state, layerIndex);

    layer.neurons.forEach((neuron) => {
      neuron.activation = Math.max(0, neuron.activation - deltaSeconds * 0.72);
      const asynchronous = 0.76 + Math.sin(state.elapsed * neuron.frequency + neuron.phase) * 0.24;
      const ambientActivation = Math.max(
        0,
        Math.sin(state.elapsed * neuron.frequency * 2.3 + neuron.phase * 1.7) - 0.68,
      ) * 1.15;
      const visibleActivation = Math.max(neuron.activation, ambientActivation);
      const intensity = Math.min(
        NETWORK_VISUAL_CONFIG.maximumGlow,
        NETWORK_VISUAL_CONFIG.neuronOpacity * neuron.baseIntensity * asynchronous + visibleActivation * 0.54,
      );
      const activeRadius = radius * (1 + visibleActivation * 0.1);
      const y = neuron.yRatio * state.height;

      context.save();
      context.globalCompositeOperation = "destination-out";
      context.fillStyle = "#000";
      context.beginPath();
      context.arc(x, y, activeRadius + NETWORK_VISUAL_CONFIG.nodeLineWidth * 0.8, 0, TAU);
      context.fill();
      context.restore();

      if (visibleActivation > 0.04) {
        const glow = context.createRadialGradient(x, y, 0, x, y, activeRadius * 4.2);
        glow.addColorStop(0, `rgba(${NETWORK_VISUAL_CONFIG.neuronColor}, ${visibleActivation * 0.42})`);
        glow.addColorStop(1, `rgba(${NETWORK_VISUAL_CONFIG.neuronColor}, 0)`);
        context.fillStyle = glow;
        context.beginPath();
        context.arc(x, y, activeRadius * 4.2, 0, TAU);
        context.fill();
      }

      context.beginPath();
      context.arc(x, y, activeRadius, 0, TAU);
      context.fillStyle = `rgba(${NETWORK_VISUAL_CONFIG.neuronColor}, ${0.11 + visibleActivation * 0.48})`;
      context.fill();
      context.strokeStyle = `rgba(${NETWORK_VISUAL_CONFIG.neuronColor}, ${intensity})`;
      context.lineWidth = NETWORK_VISUAL_CONFIG.nodeLineWidth;
      context.stroke();
      if (visibleActivation > 0.15) {
        context.beginPath();
        context.arc(x, y, activeRadius * 0.65, 0, TAU);
        context.strokeStyle = `rgba(${NETWORK_VISUAL_CONFIG.activeColor}, ${visibleActivation * 0.8})`;
        context.lineWidth = 1.1;
        context.stroke();
      }
    });
  }
}

function drawPulses(context: CanvasRenderingContext2D, state: NetworkState) {
  for (const pulse of state.pulses) {
    const points = connectionPoints(state, pulse.connection);
    const tailLength = 0.14;
    const gradientStart = bezierPoint(points, Math.max(0, pulse.progress - tailLength));
    const head = bezierPoint(points, pulse.progress);
    const trail = context.createLinearGradient(gradientStart.x, gradientStart.y, head.x, head.y);
    trail.addColorStop(0, `rgba(${NETWORK_VISUAL_CONFIG.connectionColor}, 0)`);
    trail.addColorStop(0.7, `rgba(${NETWORK_VISUAL_CONFIG.neuronColor}, ${pulse.intensity * 0.52})`);
    trail.addColorStop(1, `rgba(${NETWORK_VISUAL_CONFIG.activeColor}, ${pulse.intensity * 0.92})`);

    context.beginPath();
    const samples = 7;
    for (let sample = 0; sample <= samples; sample += 1) {
      const progress = Math.max(0, pulse.progress - tailLength + (tailLength * sample) / samples);
      const point = bezierPoint(points, progress);
      if (sample === 0) context.moveTo(point.x, point.y);
      else context.lineTo(point.x, point.y);
    }
    context.strokeStyle = trail;
    context.lineWidth = 2.1;
    context.stroke();

    const glow = context.createRadialGradient(head.x, head.y, 0, head.x, head.y, 10);
    glow.addColorStop(0, `rgba(${NETWORK_VISUAL_CONFIG.activeColor}, ${pulse.intensity})`);
    glow.addColorStop(0.28, `rgba(${NETWORK_VISUAL_CONFIG.neuronColor}, ${pulse.intensity * 0.76})`);
    glow.addColorStop(1, `rgba(${NETWORK_VISUAL_CONFIG.connectionColor}, 0)`);
    context.fillStyle = glow;
    context.beginPath();
    context.arc(head.x, head.y, 10, 0, TAU);
    context.fill();

    context.fillStyle = `rgba(${NETWORK_VISUAL_CONFIG.activeColor}, ${Math.min(1, pulse.intensity * 1.08)})`;
    context.beginPath();
    context.arc(head.x, head.y, 2.2, 0, TAU);
    context.fill();
  }
}

function applyLightMask(context: CanvasRenderingContext2D, state: NetworkState) {
  const drift = Math.sin(state.elapsed * 0.035) * state.width * 0.018;
  const centerX = state.width * NETWORK_VISUAL_CONFIG.lightCenterX + drift;
  const centerY = state.height * NETWORK_VISUAL_CONFIG.lightCenterY;
  const radius = Math.max(state.width, state.height) * NETWORK_VISUAL_CONFIG.lightRadius;
  const mask = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
  mask.addColorStop(0, `rgba(255, 255, 255, ${NETWORK_VISUAL_CONFIG.lightIntensity})`);
  mask.addColorStop(0.32, "rgba(255, 255, 255, 0.78)");
  mask.addColorStop(0.68, "rgba(255, 255, 255, 0.24)");
  mask.addColorStop(1, "rgba(255, 255, 255, 0.045)");
  context.globalCompositeOperation = "destination-in";
  context.fillStyle = mask;
  context.fillRect(0, 0, state.width, state.height);
  context.globalCompositeOperation = "source-over";
}

function renderFrame(
  context: CanvasRenderingContext2D,
  bufferContext: CanvasRenderingContext2D,
  buffer: HTMLCanvasElement,
  state: NetworkState,
  deltaSeconds: number,
  reducedMotion: boolean,
) {
  if (!reducedMotion) {
    state.offset += NETWORK_VISUAL_CONFIG.horizontalSpeed * deltaSeconds;
    state.elapsed += deltaSeconds;
    state.nextPulseIn -= deltaSeconds;

    if (state.nextPulseIn <= 0) {
      spawnPulse(state);
      if (random(state) < 0.62) spawnPulse(state);
      const activityWave = 0.72 + Math.sin(state.elapsed * 0.18) * 0.22;
      state.nextPulseIn = (
        NETWORK_VISUAL_CONFIG.pulseIntervalMinimum
        + random(state) * NETWORK_VISUAL_CONFIG.pulseIntervalVariation
      ) / activityWave;
    }

    for (let index = state.pulses.length - 1; index >= 0; index -= 1) {
      const pulse = state.pulses[index];
      pulse.connection.activity = Math.min(
        1,
        pulse.connection.activity
          + deltaSeconds * NETWORK_VISUAL_CONFIG.connectionActivityGain * pulse.intensity,
      );
      pulse.progress += pulse.speed * deltaSeconds;
      if (pulse.progress >= 1 && !continuePulse(state, pulse)) state.pulses.splice(index, 1);
    }
  }

  const { first, last } = visibleLayerRange(state);
  bufferContext.clearRect(0, 0, state.width, state.height);
  drawConnections(bufferContext, state, first, last, deltaSeconds);
  if (!reducedMotion) drawPulses(bufferContext, state);
  drawNeurons(bufferContext, state, first, last, deltaSeconds);
  applyLightMask(bufferContext, state);

  context.clearRect(0, 0, state.width, state.height);
  context.drawImage(buffer, 0, 0, state.width, state.height);

  for (const index of state.layerCache.keys()) {
    if (index < first - 3 || index > last + 3) state.layerCache.delete(index);
  }
  for (const index of state.connectionCache.keys()) {
    if (index < first - 3 || index > last + 2) state.connectionCache.delete(index);
  }
}

export function NeuralNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    const context = canvas?.getContext("2d");
    if (!canvas || !container || !context) return;

    const buffer = document.createElement("canvas");
    const bufferContext = buffer.getContext("2d");
    if (!bufferContext) return;

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const state: NetworkState = {
      width: 0,
      height: 0,
      dpr: 1,
      offset: 0,
      elapsed: 0,
      nextPulseIn: 0.4,
      layerCache: new Map(),
      connectionCache: new Map(),
      pulses: [],
      randomState: 0x9e3779b9,
    };

    let frame = 0;
    let lastTimestamp = 0;
    let visible = true;

    const resize = () => {
      const bounds = container.getBoundingClientRect();
      const width = Math.max(1, Math.round(bounds.width));
      const height = Math.max(1, Math.round(bounds.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (width === state.width && height === state.height && dpr === state.dpr) return;

      const previousWidth = state.width;
      state.width = width;
      state.height = height;
      state.dpr = dpr;
      if ((previousWidth < 720) !== (width < 720)) {
        state.layerCache.clear();
        state.connectionCache.clear();
        state.pulses.length = 0;
      }

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      buffer.width = Math.round(width * dpr);
      buffer.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      bufferContext.setTransform(dpr, 0, 0, dpr, 0, 0);
      renderFrame(context, bufferContext, buffer, state, 0, reducedMotionQuery.matches);
    };

    const animate = (timestamp: number) => {
      if (!visible || document.hidden || reducedMotionQuery.matches) {
        frame = 0;
        lastTimestamp = 0;
        return;
      }
      const deltaSeconds = lastTimestamp ? Math.min(0.05, (timestamp - lastTimestamp) / 1000) : 0;
      lastTimestamp = timestamp;
      renderFrame(context, bufferContext, buffer, state, deltaSeconds, false);
      frame = window.requestAnimationFrame(animate);
    };

    const start = () => {
      if (frame || !visible || document.hidden || reducedMotionQuery.matches) return;
      frame = window.requestAnimationFrame(animate);
    };

    const stop = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      lastTimestamp = 0;
    };

    const onVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };

    const onMotionPreferenceChange = () => {
      stop();
      renderFrame(context, bufferContext, buffer, state, 0, reducedMotionQuery.matches);
      start();
    };

    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    }, { rootMargin: "120px" });

    resizeObserver.observe(container);
    intersectionObserver.observe(container);
    document.addEventListener("visibilitychange", onVisibilityChange);
    reducedMotionQuery.addEventListener("change", onMotionPreferenceChange);
    resize();
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      reducedMotionQuery.removeEventListener("change", onMotionPreferenceChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="neural-network-background"
      aria-hidden="true"
    />
  );
}
