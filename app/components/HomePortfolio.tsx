"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  education,
  experiences,
  projects,
  socialLinks,
} from "../data/portfolio";
import { MaintenanceCase } from "./MaintenanceCase";
import { NeuralNetworkBackground } from "./NeuralNetworkBackground";
import { TechnologyExplorer } from "./TechnologyExplorer";
import { TechnologyIcon } from "./TechnologyIcon";

const navItems = [
  ["Início", "#inicio"],
  ["Projetos", "#projetos"],
  ["Experiência", "#experiencia"],
  ["Sobre", "#sobre"],
  ["Contato", "#contato"],
];

export function HomePortfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main[id], section[id]")
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-25% 0px -62%", threshold: [0, 0.12, 0.5] }
    );
    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <main className="portfolio-refined">
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>

      <header className={scrolled ? "site-header is-scrolled" : "site-header"}>
        <a className="brand" href="#inicio" aria-label="Everlyn Martins, início">
          <span className="brand-mark">EM</span>
          <span className="brand-name">Everlyn Martins</span>
        </a>

        <button
          className="menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span className="sr-only">Abrir navegação</span>
          <span />
          <span />
        </button>

        <nav
          id="primary-navigation"
          className={menuOpen ? "nav is-open" : "nav"}
          aria-label="Navegação principal"
        >
          {navItems.map(([label, href]) => (
            <a
              key={href}
              href={href}
              aria-current={activeSection === href.slice(1) ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="header-links" aria-label="Links profissionais">
          <a className="header-link-button header-link-github" href={socialLinks.github} target="_blank" rel="noreferrer">
            GitHub <span aria-hidden="true">↗</span>
          </a>
          <a className="header-link-button header-link-linkedin" href={socialLinks.linkedin} target="_blank" rel="noreferrer">
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
        </div>
      </header>

      <div id="conteudo">
        <section id="inicio" className="hero" aria-labelledby="hero-title">
          <NeuralNetworkBackground />

          <div className="hero-copy">
            <p className="eyebrow">Ciência de dados · Machine Learning</p>
            <h1 id="hero-title"><span className="title-static">Everlyn Martins</span></h1>
            <p className="hero-description">Cientista de dados. Trabalhei com previsão de falhas e análise de dados de frota na Embraer, pelo programa IEL Inova Talentos.</p>
            <div className="hero-actions">
              <a className="primary-link" href="#projetos">
                Ver projetos <span aria-hidden="true">↓</span>
              </a>
              <a className="text-link linkedin-pill" href={socialLinks.linkedin} target="_blank" rel="noreferrer">
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <div className="scroll-cue" aria-hidden="true">
            <span>scroll</span>
            <i />
          </div>
        </section>

        <section id="projetos" className="projects section-shell" aria-labelledby="projects-title">
          <div className="section-heading">
            <div>
              <p className="section-index">Portfólio</p>
              <h2 id="projects-title">Projetos selecionados</h2>
            </div>

          </div>

          <div className="project-list" role="list">
            {projects.map((project, index) => (
              <article
                className="project-card"
                key={project.slug}
                role="listitem"
              >
                <header className="project-card-header">
                  <span className="project-card-number">{project.number}</span>
                  <span className="project-category">{project.category}</span>
                </header>

                <Link
                  className={`project-visual project-visual-${project.imageStyle ?? "cover"} project-visual-${project.slug}`}
                  href={`/projetos/${project.slug}`}
                  aria-label={`Abrir case ${project.title}`}
                >
                  {project.animation && project.image ? (
                    <picture>
                      <source media="(prefers-reduced-motion: reduce)" srcSet={project.image} />
                      <img
                        src={project.animation}
                        alt={project.imageAlt ?? ""}
                        loading={index === 0 ? "eager" : "lazy"}
                        decoding="async"
                      />
                    </picture>
                  ) : project.image ? (
                    <Image
                      src={project.image}
                      alt={project.imageAlt ?? ""}
                      fill
                      sizes="(max-width: 900px) 100vw, 50vw"
                      priority={index === 0}
                      unoptimized
                    />
                  ) : (
                    <ReliabilityVisual />
                  )}
                </Link>

                <div className="project-copy">
                  <h3>{project.title}</h3>
                  <p className="project-summary">{project.summary}</p>

                  <ul className="project-technologies" aria-label={`Tecnologias usadas em ${project.title}`}>
                    {project.technologies.slice(0, 4).map((technology) => (
                      <li key={technology}><TechnologyIcon name={technology} />{technology}</li>
                    ))}
                  </ul>

                  <div className="project-links">
                    <Link href={`/projetos/${project.slug}`}>
                      Ver detalhes <span aria-hidden="true">→</span>
                    </Link>
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noreferrer">
                        Ver projeto <span aria-hidden="true">↗</span>
                      </a>
                    )}
                    <a href={project.repositoryUrl} target="_blank" rel="noreferrer">
                      GitHub <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <MaintenanceCase />

        <section id="experiencia" className="experience section-shell" aria-labelledby="experience-title">
          <div className="section-heading compact-heading">
            <div>
              <p className="section-index">Trajetória</p>
              <h2 id="experience-title">Experiência</h2>
            </div>

          </div>

          <div className="timeline">
            {experiences.map((experience) => (
              <details key={experience.organization}>
                <summary>
                  <span className="timeline-period">{experience.period}</span>
                  <span className="timeline-main">
                    <strong>{experience.role}</strong>
                    <span>{experience.organization}</span>
                  </span>
                  <span className="timeline-location">{experience.location}</span>
                  <i aria-hidden="true">+</i>
                </summary>
                <div className="timeline-detail">
                  <p>{experience.summary}</p>
                  <ul>
                    {experience.details.map((detail) => <li key={detail}>{detail}</li>)}
                  </ul>
                  <div>{experience.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className="technologies section-shell" aria-labelledby="technologies-title">
          <div className="section-heading compact-heading">
            <div>
              <p className="section-index">Ferramentas</p>
              <h2 id="technologies-title">Tecnologias</h2>
            </div>
            <p>Projetos relacionados a cada tecnologia.</p>
          </div>
          <TechnologyExplorer />
        </section>

        <section id="sobre" className="about section-shell" aria-labelledby="about-title">
          <div className="about-image">
            <Image
              src="https://avatars.githubusercontent.com/u/5439585?v=4"
              alt="Foto de perfil de Everlyn Martins"
              width={640}
              height={780}
              loading="lazy"
              unoptimized
            />

          </div>
          <div className="about-copy">
            <p className="section-index">Sobre</p>
            <h2 id="about-title">Pesquisa e trabalho aplicado.</h2>
            <p>
              Sou doutor em Física pela UFSC. Depois da pesquisa acadêmica, trabalhei com dados operacionais de aeronaves na Embraer. Desenvolvi 8 pipelines em Python, R e SQL para estudos de falhas, risco e anomalias.
            </p>
            <p>
              Nos projetos pessoais, estudo recomendação, previsão e implantação de modelos. Publico o código e os experimentos no GitHub.
            </p>
          </div>
        </section>

        <section className="education section-shell" aria-labelledby="education-title">
          <div className="education-heading">
            <p className="section-index">Formação</p>
            <h2 id="education-title">Formação acadêmica</h2>
          </div>
          <div className="education-list">
            {education.map((item) => (
              <details key={item.degree}>
                <summary>
                  <span>{item.period}</span>
                  <strong>{item.degree}</strong>
                  <i aria-hidden="true">+</i>
                </summary>
                <div>
                  <p>{item.institution}</p>
                  <p>{item.detail}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        <section id="contato" className="contact" aria-labelledby="contact-title">
          <div className="section-shell contact-inner">
            <p className="section-index">Contato</p>
            <h2 id="contact-title">Contato profissional</h2>
            <div className="contact-links">
              <a href={socialLinks.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
              <a href={socialLinks.github} target="_blank" rel="noreferrer">GitHub ↗</a>
            </div>

          </div>
        </section>

        <footer className="footer section-shell">
          <span>Everlyn Martins · {new Date().getFullYear()}</span>
          <span>Ciência de Dados · Analytics · Machine Learning</span>
          <a href="#inicio">Voltar ao início ↑</a>
        </footer>
      </div>
    </main>
  );
}

function ReliabilityVisual() {
  return (
    <div className="reliability-visual" aria-hidden="true">
      <div className="chart-label">Λ(t) = λtᵝ</div>
      <div className="chart-grid" />
      <div className="chart-curve" />
      <span className="chart-point point-a" />
      <span className="chart-point point-b" />
      <span className="chart-point point-c" />
      <div className="chart-readout">
        <span>tendência</span>
        <strong>β = 0,84</strong>
      </div>
    </div>
  );
}
