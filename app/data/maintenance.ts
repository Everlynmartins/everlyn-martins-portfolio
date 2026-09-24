// Values transcribed from the public project README and Stage 3 report.
// Development validation results are distinct from the cloud replay checks.
export const maintenanceRepository = "https://github.com/Everlynmartins/adaptive-predictive-maintenance-platform";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const localAsset = (path: string) => `${basePath}${path}`;

export const maintenanceViews = [
  {
    id: "previsoes", label: "Previsões", title: "Acompanhar o risco por ciclo",
    description: "O replay avança pela trajetória de uma unidade. A API retorna risco para o horizonte escolhido, alertas e diagnóstico dos modelos.",
    image: localAsset("/images/maintenance-dashboard.png"), animation: localAsset("/images/maintenance-replay.gif"),
    alt: "Aplicação de manutenção preditiva: unidade 1, ciclo 191, horizonte de 30 ciclos e diagnósticos dos modelos",
  },
  {
    id: "modelos", label: "Modelos", title: "Comparar as probabilidades",
    description: "A mesma trajetória é avaliada por diferentes modelos. A divergência entre eles fica visível no painel, sem ser tratada como intervalo de confiança.",
    image: localAsset("/images/maintenance-models.png"), animation: undefined,
    alt: "Gráfico da aplicação com probabilidades de falha por modelo no horizonte de 30 ciclos",
  },
  {
    id: "historico", label: "Histórico", title: "Consultar previsões registradas",
    description: "O painel recupera previsões e alertas pela API. Os registros ficam no PostgreSQL, separados da tarefa que executa a aplicação.",
    image: localAsset("/images/maintenance-history.png"), animation: undefined,
    alt: "Histórico da aplicação com previsões persistidas, risco por ciclo e alertas",
  },
];
export const maintenanceBenchmarks = [
  { model: "Transformer", horizon: "15 ciclos", ap: "0,9880", brier: "0,0078" },
  { model: "Transformer", horizon: "30 ciclos", ap: "0,9834", brier: "0,0177" },
  { model: "Fusão", horizon: "15 ciclos", ap: "0,9731", brier: "0,0127" },
  { model: "Fusão", horizon: "30 ciclos", ap: "0,9610", brier: "0,0254" },
];
