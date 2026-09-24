import Link from "next/link";
import { maintenanceBenchmarks, maintenanceRepository } from "../data/maintenance";
import { CinematicShowcase } from "./CinematicShowcase";
import { TechnologyIcon } from "./TechnologyIcon";

export function MaintenanceCase() {
  return (
    <section className="maintenance-case" id="case" aria-labelledby="case-title">
      <div className="section-shell">
        <div className="case-heading-row">
          <p className="section-index">Estudo de caso</p>
          <span className="case-cloud-label"><TechnologyIcon name="AWS" /> AWS · laboratório validado</span>
        </div>
        <h2 id="case-title">Manutenção preditiva<br />adaptativa</h2>
        <p className="case-deck">Probabilidade de falha em 15 e 30 ciclos, usando o benchmark NASA C MAPSS FD001. Modelagem, API e implantação na AWS.</p>
        <CinematicShowcase />
        <div className="case-evidence">
          <div className="case-benchmark">
            <h3>Avaliação dos modelos</h3>
            <p>Resultados na validação de desenvolvimento, com separação por unidade.</p>
            <div className="benchmark-scroll">
              <table>
                <caption className="sr-only">Resultados de validação por modelo e horizonte</caption>
                <thead><tr><th scope="col">Modelo</th><th scope="col">Horizonte</th><th scope="col">AP ↑</th><th scope="col">Brier ↓</th></tr></thead>
                <tbody>{maintenanceBenchmarks.map(row => <tr key={row.model + row.horizon}><th scope="row">{row.model}</th><td>{row.horizon}</td><td>{row.ap}</td><td>{row.brier}</td></tr>)}</tbody>
              </table>
            </div>
            <p className="evidence-note">AP: Average Precision. Brier: erro das probabilidades. O teste oficial NASA permanece reservado. As redes neurais são avaliadas separadamente da fusão.</p>
            <a className="evidence-source" href={`${maintenanceRepository}#machine-learning`} target="_blank" rel="noreferrer">Método e resultados ↗</a>
          </div>
          <div className="case-cloud-evidence">
            <h3>Ensaio na AWS</h3>
            <div className="evidence-number"><strong>40</strong><div>previsões preservadas<p>Com 3 alertas, após parada e substituição controlada da tarefa ECS.</p></div></div>
            <p className="cloud-stack">FastAPI · ECS Fargate · RDS PostgreSQL · Terraform</p>
            <a className="evidence-source" href={`${maintenanceRepository}/blob/main/docs/stage3_validation_report.md`} target="_blank" rel="noreferrer">Relatório de implantação ↗</a>
            <div className="telemetry-result"><strong>≈25%</strong><p>menos bytes estimados com a seleção de sensores, preservando os resultados da fusão no cenário avaliado.</p></div>
            <a className="evidence-source" href={`${maintenanceRepository}/blob/main/reports/telemetry_filtering_report.md`} target="_blank" rel="noreferrer">Experimento de telemetria ↗</a>
          </div>
        </div>
        <div className="case-bottom"><p>Benchmark simulado e implantação de laboratório. Resultados restritos aos cenários documentados.</p><Link href="/projetos/manutencao-preditiva-adaptativa">Estudo completo →</Link></div>
      </div>
    </section>
  );
}
