"use client";

import { useState } from "react";

const brandIcons: Record<string, string> = {
  Python: "python/python-original.svg",
  PyTorch: "pytorch/pytorch-original.svg",
  XGBoost: "xgboost/xgboost-original.svg",
  FastAPI: "fastapi/fastapi-original.svg",
  PostgreSQL: "postgresql/postgresql-original.svg",
  AWS: "amazonwebservices/amazonwebservices-original.svg",
  Terraform: "terraform/terraform-original.svg",
  "scikit learn": "scikitlearn/scikitlearn-original.svg",
  "Next.js": "nextjs/nextjs-original.svg",
  React: "react/react-original.svg",
  TypeScript: "typescript/typescript-original.svg",
  NumPy: "numpy/numpy-original.svg",
  SciPy: "scipy/scipy-original.svg",
  Pandas: "pandas/pandas-original.svg",
  Matplotlib: "matplotlib/matplotlib-original.svg",
  Jupyter: "jupyter/jupyter-original.svg",
  Pytest: "pytest/pytest-original.svg",
  Git: "git/git-original.svg",
  R: "r/r-original.svg",
  "C++": "cplusplus/cplusplus-original.svg",
  Linux: "linux/linux-original.svg",
};

const iconKinds: Record<string, "database" | "chart" | "network" | "stats" | "math" | "code" | "cloud"> = {
  SQL: "database",
  "Random Forest": "network",
  CatBoost: "network",
  LightGBM: "chart",
  SHAP: "stats",
  "Redes neurais": "network",
  "Séries temporais": "chart",
  "Inferência bayesiana": "math",
  Bayes: "math",
  "Monte Carlo": "stats",
  Sobrevivência: "chart",
  "Testes estatísticos": "stats",
  Visualização: "chart",
  Mathematica: "math",
  "Álgebra linear": "math",
  "Informação quântica": "network",
  Manim: "math",
  LaTeX: "code",
};

function FallbackIcon({ kind }: { kind: string }) {
  if (kind === "database") {
    return <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" /></>;
  }
  if (kind === "network") {
    return <><path d="M6 7 12 12 18 6M12 12l-5 7m5-7 6 7" /><circle cx="6" cy="6" r="2" /><circle cx="18" cy="5" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="7" cy="19" r="2" /><circle cx="18" cy="19" r="2" /></>;
  }
  if (kind === "math") {
    return <><path d="M5 4h14M6 5l12 14M18 5 6 19M5 20h14" /><circle cx="12" cy="12" r="2" /></>;
  }
  if (kind === "stats") {
    return <><path d="M4 20V5M4 20h17M8 17v-5m5 5V8m5 9V4" /><path d="m7 9 5-3 4 2 4-4" /></>;
  }
  if (kind === "cloud") {
    return <path d="M7 18a4 4 0 0 1-.4-8A5.5 5.5 0 0 1 17 8.5a4.8 4.8 0 0 1 .5 9.5H7Z" />;
  }
  if (kind === "code") {
    return <><path d="m8 7-5 5 5 5m8-10 5 5-5 5M14 4l-4 16" /></>;
  }
  return <><path d="M4 19V5m0 14h16M7 15l4-4 3 2 5-7" /><circle cx="19" cy="6" r="1.5" /></>;
}

export function TechnologyIcon({ name }: { name: string }) {
  const [failed, setFailed] = useState(false);
  const icon = brandIcons[name];

  if (name === "AWS") {
    return (
      <svg className="technology-icon technology-icon-brand technology-icon-aws" viewBox="0 0 32 24" aria-hidden="true">
        <text x="2" y="15.5" fill="currentColor" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="700" letterSpacing="-.8">aws</text>
        <path d="M5 19c6 3.1 15.7 3 22-1.1" fill="none" stroke="#f8991d" strokeWidth="1.8" strokeLinecap="round" />
        <path d="m24.8 16.8 2.8 1.1-1.8 2.5" fill="none" stroke="#f8991d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "XGBoost") {
    return (
      <svg className="technology-icon technology-icon-brand technology-icon-xgboost" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 4v5M12 9 6.5 13M12 9l5.5 4M6.5 13 4 18M6.5 13 9 18M17.5 13 15 18M17.5 13 20 18" />
        <circle cx="12" cy="4" r="2" fill="#42ba91" stroke="#42ba91" />
        <circle cx="6.5" cy="13" r="1.8" fill="#42ba91" stroke="#42ba91" />
        <circle cx="17.5" cy="13" r="1.8" fill="#42ba91" stroke="#42ba91" />
        <circle cx="4" cy="19" r="1.5" fill="#84d5b9" stroke="#84d5b9" />
        <circle cx="9" cy="19" r="1.5" fill="#84d5b9" stroke="#84d5b9" />
        <circle cx="15" cy="19" r="1.5" fill="#84d5b9" stroke="#84d5b9" />
        <circle cx="20" cy="19" r="1.5" fill="#84d5b9" stroke="#84d5b9" />
      </svg>
    );
  }

  if (icon && !failed) {
    return (
      <img
        className="technology-icon"
        src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon}`}
        alt=""
        aria-hidden="true"
        loading="lazy"
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <svg className="technology-icon technology-icon-fallback" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <FallbackIcon kind={iconKinds[name] ?? "chart"} />
    </svg>
  );
}
