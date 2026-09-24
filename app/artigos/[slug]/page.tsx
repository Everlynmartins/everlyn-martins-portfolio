import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "../../data/portfolio";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) return {};

  return {
    title: `${article.title} | Everlyn Martins`,
    description: article.description,
    openGraph: {
      title: `${article.title} | Everlyn Martins`,
      description: article.description,
      type: "article",
      images: [],
    },
    twitter: {
      card: "summary",
      title: `${article.title} | Everlyn Martins`,
      description: article.description,
      images: [],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const articleIndex = articles.findIndex((item) => item.slug === slug);
  const article = articles[articleIndex];
  if (!article) notFound();
  const nextArticle = articles[(articleIndex + 1) % articles.length];

  return (
    <main className="detail-page article-page">
      <header className="detail-header">
        <Link href="/" className="brand" aria-label="Voltar ao início">
          <span className="brand-mark">EM</span>
          <span className="brand-name">Everlyn Martins</span>
        </Link>
        <Link href="/#artigos">Todos os artigos ↓</Link>
      </header>

      <article className="publication section-shell">
        <div className="publication-meta">
          <span>{article.category}</span>
          <span>{article.date}</span>
          <span>{article.length}</span>
        </div>
        <h1>{article.title}</h1>
        <p className="publication-lead">{article.description}</p>

        <div className="publication-info">
          <div>
            <span>Publicado em</span>
            <strong>{article.publication}</strong>
          </div>
        </div>

        <div className="publication-note">
          <p className="section-index">Nota de leitura</p>
          <p>
            Esta página apresenta uma entrada curta para a publicação. O artigo original contém a formulação completa, os métodos, os resultados e as referências.
          </p>
          <p>
            Meu trabalho acadêmico combina modelagem matemática, computação científica e validação analítica de resultados em informação quântica, matéria condensada e teoria quântica de campos.
          </p>
        </div>

      </article>

      <Link className="next-case" href={`/artigos/${nextArticle.slug}`}>
        <span>Próxima publicação</span>
        <strong>{nextArticle.title}</strong>
        <i aria-hidden="true">→</i>
      </Link>
    </main>
  );
}
