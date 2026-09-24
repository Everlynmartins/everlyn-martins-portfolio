import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, socialLinks } from "../../data/portfolio";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};

  return {
    title: `${project.title} | Everlyn Martins`,
    description: project.summary,
    openGraph: {
      title: `${project.title} | Everlyn Martins`,
      description: project.summary,
      type: "article",
      images: project.image ? [{ url: project.image, alt: project.imageAlt }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Everlyn Martins`,
      description: project.summary,
      images: project.image ? [project.image] : [],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((item) => item.slug === slug);
  const project = projects[projectIndex];
  if (!project) notFound();
  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <main className="detail-page">
      <header className="detail-header">
        <Link href="/" className="brand" aria-label="Voltar ao início">
          <span className="brand-mark">EM</span>
          <span className="brand-name">Everlyn Martins</span>
        </Link>
        <Link href="/#projetos">Todos os projetos ↓</Link>
      </header>

      <article>
        <section className="detail-hero section-shell">
          <div className="detail-hero-topline">
            <p className="section-index">Case {project.number} · {project.category}</p>
            <span>{project.technologies.join(" · ")}</span>
          </div>
          <h1>{project.title}</h1>
          <p className="detail-summary">{project.summary}</p>
          <div className="detail-metrics">
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </section>

        {project.image && (
          <figure className={`detail-image detail-image-${project.imageStyle ?? "cover"} detail-image-${project.slug} section-shell`}>
            {project.animation ? (
              <picture>
                <source media="(prefers-reduced-motion: reduce)" srcSet={project.image} />
                <img src={project.animation} alt={project.imageAlt ?? project.title} decoding="async" />
              </picture>
            ) : (
              <Image
                src={project.image}
                alt={project.imageAlt ?? project.title}
                width={1720}
                height={960}
                sizes="100vw"
                priority
                unoptimized
              />
            )}
          </figure>
        )}

        <section className="detail-narrative section-shell">
          <div className="narrative-lead">
            <p className="section-index">Problema</p>
            <h2>{project.caseStudy.problem}</h2>
          </div>
          <div className="narrative-grid">
            <div>
              <p className="case-label">Contexto</p>
              <p>{project.caseStudy.context}</p>
            </div>
            <div>
              <p className="case-label">Minha responsabilidade</p>
              <p>{project.caseStudy.responsibility}</p>
            </div>
          </div>
        </section>

        <section className="detail-decisions">
          <div className="section-shell">
            <div className="decision-column">
              <p className="section-index">Decisões técnicas</p>
              <ol>
                {project.caseStudy.decisions.map((decision, index) => (
                  <li key={decision}><span>0{index + 1}</span>{decision}</li>
                ))}
              </ol>
            </div>
            <div className="decision-column">
              <p className="section-index">Desafios</p>
              <ol>
                {project.caseStudy.challenges.map((challenge, index) => (
                  <li key={challenge}><span>0{index + 1}</span>{challenge}</li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="detail-outcome section-shell">
          <div>
            <p className="section-index">Solução</p>
            <p>{project.caseStudy.solution}</p>
          </div>
          <div>
            <p className="section-index">Resultado</p>
            <p>{project.caseStudy.result}</p>
          </div>
        </section>

        <section className="detail-actions section-shell">
          <div>
            {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer">Ver projeto ↗</a>}
            <a href={project.repositoryUrl} target="_blank" rel="noreferrer">Abrir GitHub ↗</a>
          </div>
          <a href={socialLinks.linkedin} target="_blank" rel="noreferrer">Contato pelo LinkedIn ↗</a>
        </section>

        <Link className="next-case" href={`/projetos/${nextProject.slug}`}>
          <span>Próximo case</span>
          <strong>{nextProject.title}</strong>
          <i aria-hidden="true">→</i>
        </Link>
      </article>
    </main>
  );
}
