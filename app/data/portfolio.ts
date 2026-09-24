export type Project = {
  slug: string;
  number: string;
  title: string;
  category: string;
  statement: string;
  summary: string;
  role: string;
  technologies: string[];
  metrics: { value: string; label: string }[];
  image?: string;
  animation?: string;
  imageAlt?: string;
  imageStyle?: "cover" | "contain-light" | "contain-light-wide" | "contain-dark";
  liveUrl?: string;
  repositoryUrl: string;
  caseStudy: {
    problem: string;
    context: string;
    responsibility: string;
    decisions: string[];
    challenges: string[];
    solution: string;
    result: string;
  };
};

export type Experience = {
  period: string;
  organization: string;
  role: string;
  location: string;
  summary: string;
  details: string[];
  technologies: string[];
};

export type Article = {
  slug: string;
  category: string;
  title: string;
  publication: string;
  date: string;
  length: string;
  description: string;
};

export const siteMeta = {
  name: "Everlyn Martins",
  title: "Everlyn Martins | Ciência de Dados, Analytics e Machine Learning",
  description:
    "Portfólio de Everlyn Martins, cientista de dados com experiência em machine learning, analytics, modelagem estatística e produtos de dados.",
};

export const socialLinks = {
  github: "https://github.com/Everlynmartins",
  linkedin: "https://www.linkedin.com/in/everlyn-martins",
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const localAsset = (path: string) => `${basePath}${path}`;

const projectEntries: Project[] = [
  {
    slug: "manutencao-preditiva-adaptativa",
    number: "01",
    title: "Manutenção preditiva adaptativa",
    category: "ML e implantação AWS",
    statement: "Previsão probabilística de falhas com API e histórico em PostgreSQL.",
    summary: "Estimativa de risco de falha em dados simulados da NASA. Aplicação com FastAPI, histórico em PostgreSQL e implantação de laboratório na AWS.",
    role: "Modelagem, validação, API, integração e infraestrutura de laboratório",
    technologies: ["Python", "PyTorch", "FastAPI", "AWS", "XGBoost", "PostgreSQL", "Terraform"],
    metrics: [{ value: "15 / 30", label: "ciclos de horizonte" }, { value: "40", label: "previsões persistidas no ensaio AWS" }, { value: "25%", label: "redução estimada de bytes na política avaliada" }],
    image: localAsset("/images/maintenance-dashboard.png"),
    animation: localAsset("/images/project-predictive-maintenance.gif"),
    imageAlt: "Dashboard de manutenção preditiva com risco, sobrevivência e diagnóstico dos modelos",
    imageStyle: "contain-dark",
    repositoryUrl: "https://github.com/Everlynmartins/adaptive-predictive-maintenance-platform",
    caseStudy: {
      problem: "Estimar risco em horizontes definidos e acompanhar previsões sem perder a rastreabilidade dos dados e modelos.",
      context: "Projeto experimental com o benchmark simulado FD001 da NASA. Os resultados se limitam à configuração avaliada e ao ambiente de laboratório.",
      responsibility: "Integração da modelagem probabilística, avaliação por unidade, serviço de aplicação, API, persistência e implantação AWS.",
      decisions: ["Separação de dados por unidades completas e características causais", "FastAPI com artefatos congelados e histórico em PostgreSQL", "Infraestrutura Terraform com ECS Fargate e RDS"],
      challenges: ["Evitar vazamento temporal e entre unidades", "Comparar economia de telemetria com qualidade e disponibilidade", "Preservar registros após substituição controlada da tarefa"],
      solution: "Modelos Weibull, Random Forest, XGBoost, hazard discreto, TCN e Transformer são avaliados em horizontes de 15 e 30 ciclos. O dashboard consome a API e apresenta previsões e alertas persistidos.",
      result: "O ensaio AWS registrou 40 previsões e 3 alertas, preservados após substituição controlada da tarefa. Uma política de sensores reduziu os bytes estimados em cerca de 25% no cenário avaliado. Aplicação de laboratório, sem alegação de uso operacional ou certificação.",
    },
  },
  {
    slug: "parfuml",
    number: "02",
    title: "ParfuML",
    category: "Produto de dados",
    statement: "Recomendação de perfumes por similaridade olfativa.",
    summary:
      "Recomendador com 3.176 fragrâncias, similaridade olfativa e comparação de preços. As consultas são calculadas no navegador.",
    role: "Concepção, ciência de dados, machine learning e desenvolvimento web",
    technologies: ["Python", "scikit learn", "Next.js", "TypeScript", "React"],
    metrics: [
      { value: "3.176", label: "fragrâncias" },
      { value: "48", label: "dimensões olfativas" },
      { value: "0,7698", label: "R² no log do preço" },
    ],
    image: localAsset("/images/parfuml-showcase.png"),
    imageAlt: "Tela inicial do ParfuML com recomendação de perfumes por dados olfativos",
    imageStyle: "contain-light-wide",
    liveUrl: "https://everlynmartins.github.io/ParfuML/",
    repositoryUrl: "https://github.com/Everlynmartins/ParfuML",
    caseStudy: {
      problem:
        "Perfumes costumam ser descritos por notas, famílias e linguagem subjetiva. Comparar milhares de fragrâncias de forma consistente exige uma representação numérica que preserve relações olfativas úteis.",
      context:
        "O projeto nasceu como uma aplicação pública para o mercado brasileiro, com foco em descoberta, similaridade e leitura transparente das limitações dos dados.",
      responsibility:
        "Estruturei o catálogo, defini as características, treinei e validei os modelos, desenhei a experiência de recomendação e desenvolvi a aplicação web.",
      decisions: [
        "Redução para 48 dimensões com 83,73% da variância explicada",
        "Ranking calculado no navegador para resposta rápida e maior privacidade",
        "Publicação sanitizada sem lojas, links de compra, vendedores ou estoque individual",
      ],
      challenges: [
        "Dados olfativos incompletos e descrições heterogêneas",
        "Comparação entre preço, perfil e similaridade sem misturar escalas",
        "Distribuição pública com proveniência, privacidade e limites de uso claros",
      ],
      solution:
        "O catálogo recebeu vetores olfativos compactos, grupos de perfil, avaliação bayesiana e estimativa de preço. A interface transforma respostas do usuário no mesmo espaço vetorial e calcula o ranking por similaridade de cosseno.",
      result:
        "Uma aplicação estática com 3.176 perfumes, concordância de perfil de 0,9904 nos 5 vizinhos e consulta local sem autenticação ou banco de usuários.",
    },
  },
  {
    slug: "rede-neural-numpy-manim",
    number: "03",
    title: "Como uma rede neural aprende",
    category: "Redes neurais e visualização",
    statement: "Pesos, ativações e gradientes calculados com números reais do treinamento.",
    summary:
      "Rede implementada em NumPy, com animações dos pesos, gradientes e fronteira de decisão obtidos durante o treinamento.",
    role: "Modelagem, implementação NumPy, validação numérica e animação técnica",
    technologies: ["Python", "NumPy", "Manim", "Jupyter", "LaTeX"],
    metrics: [
      { value: "28", label: "observações" },
      { value: "8", label: "neurônios ocultos" },
      { value: "1,53 × 10⁻⁹", label: "maior erro relativo nos gradientes" },
    ],
    image:
      "https://raw.githubusercontent.com/Everlynmartins/neural-network-learning-manim/main/assets/images/04-final-boundary.png",
    animation: localAsset("/images/project-neural-network-learning.gif"),
    imageAlt:
      "Fronteira de decisão formada pela combinação de 8 neurônios em uma rede neural",
    imageStyle: "contain-dark",
    repositoryUrl:
      "https://github.com/Everlynmartins/neural-network-learning-manim",
    caseStudy: {
      problem:
        "Explicações de redes neurais costumam esconder os valores que conectam entradas, pesos, ativações, perda e atualização. Isso dificulta verificar como cada etapa produz a seguinte.",
      context:
        "O projeto usa o mesmo treinamento determinístico para gerar os cálculos, os snapshots e todos os elementos exibidos na animação.",
      responsibility:
        "Implementei o treinamento em NumPy, as cenas em Manim, o notebook técnico e as verificações numéricas dos gradientes e dos arquivos publicados.",
      decisions: [
        "Arquitetura 2 × 8 × 1 com ReLU e saída sigmoide",
        "Valores da animação obtidos diretamente do treinamento",
        "Gradientes analíticos comparados com diferenças finitas centrais",
      ],
      challenges: [
        "Sincronizar a narrativa visual com os cálculos reais",
        "Mostrar a retropropagação sem perder legibilidade",
        "Separar acurácia de treino de capacidade de generalização",
      ],
      solution:
        "Um módulo NumPy produz os dados, pesos, previsões, perdas e gradientes. A animação consome snapshots das épocas 0, 1, 10, 50 e 100 e apresenta cada transformação com os valores correspondentes.",
      result:
        "A perda média caiu de 0,618574 para 0,083853. A rede classificou corretamente os 28 pontos de treino, e o maior erro relativo na verificação dos gradientes foi 1,533 × 10⁻⁹.",
    },
  },
  {
    slug: "pendulo-duplo-ml",
    number: "04",
    title: "Previsão recursiva com ML",
    category: "Previsão sequencial",
    statement: "Avaliação do erro acumulado em previsões recursivas.",
    summary:
      "Previsão de trajetórias com uma MLP. O refinamento local reduziu o RMSE de posição em 27,8% na comparação de 10 segundos.",
    role: "Ciência de dados, desenho experimental, machine learning e visualização",
    technologies: ["Python", "SciPy", "scikit learn", "NumPy", "Matplotlib"],
    metrics: [
      { value: "27,8%", label: "redução no RMSE de posição" },
      { value: "1.812", label: "observações no refinamento" },
      { value: "10 s", label: "horizonte de comparação" },
    ],
    image: localAsset("/images/project-pendulum-refinement.webp"),
    animation: "https://raw.githubusercontent.com/Everlynmartins/double-pendulum-python/main/notebooks/images/pendulo_duplo_ml_refinamento.gif",
    imageAlt:
      "Animação do pêndulo duplo com comparação do erro antes e depois do refinamento do modelo",
    imageStyle: "contain-dark",
    repositoryUrl: "https://github.com/Everlynmartins/double-pendulum-python",
    caseStudy: {
      problem:
        "Uma boa métrica pontual pode esconder instabilidade quando cada saída prevista alimenta o passo seguinte. O erro pequeno de uma etapa pode crescer durante toda a sequência.",
      context:
        "O experimento usa uma sequência de referência e separa a avaliação pontual da qualidade do rollout livre ao longo de 10 segundos.",
      responsibility:
        "Gerei as trajetórias sintéticas, treinei a MLP, defini o refinamento local, integrei as previsões e construí as métricas e visualizações.",
      decisions: [
        "Separação entre treino e teste feita por trajetória",
        "Características periódicas para representar os ângulos",
        "Referência numérica de alta precisão e rollout recursivo da rede",
      ],
      challenges: [
        "Crescimento recursivo do erro em previsão livre",
        "Avaliação coerente de ângulos periódicos",
        "Leitura conjunta de posição, horizonte e conservação de energia",
      ],
      solution:
        "A rede prevê 2 variáveis de evolução e o estado futuro é integrado recursivamente. Uma cópia do modelo recebe 72 segundos de trajetórias locais com ruído para testar adaptação ao regime de interesse.",
      result:
        "O refinamento reduziu o RMSE de posição em 27,8% e a máxima deriva relativa de energia em 59,8%, com uma pequena piora de 0,100 s no primeiro cruzamento do erro de 0,25 m.",
    },
  },
  {
    slug: "estatistica-versus-machine-learning",
    number: "05",
    title: "Estatística versus Machine Learning",
    category: "Validação de modelos",
    statement: "Comparação de estimadores em dados conhecidos e fora da distribuição.",
    summary:
      "Comparação de máxima verossimilhança, Random Forest, XGBoost e MLP. Avaliação por trajetória, com testes fora da distribuição.",
    role: "Desenho experimental, simulação, machine learning, auditorias e visualização",
    technologies: ["Python", "scikit learn", "XGBoost", "NumPy", "Pytest"],
    metrics: [
      { value: "25", label: "combinações de parâmetros" },
      { value: "5", label: "sementes" },
      { value: "3", label: "cenários de generalização" },
    ],
    image: localAsset("/images/project-nhpp-ml-comparison-reference.png"),
    animation: localAsset("/images/project-nhpp-ml-comparison.gif"),
    imageAlt:
      "Gráfico do processo NHPP Power Law com falhas observadas e curvas de ajuste progressivo de modelos estatísticos e de machine learning",
    imageStyle: "contain-dark",
    repositoryUrl:
      "https://github.com/Everlynmartins/XGBoost-RandomForest-NeuralNetworks-Statistics-Compare",
    caseStudy: {
      problem:
        "Um modelo pode apresentar bom resultado por ter aprendido a distribuição histórica e perder essa vantagem quando encontra combinações ou regimes novos.",
      context:
        "O estudo compara métodos estatísticos e modelos de machine learning em trajetórias simuladas de eventos, preservando a separação entre trajetórias completas.",
      responsibility:
        "Estruturei a simulação, as características, o protocolo progressivo, os modelos, as métricas, os testes de generalização e as auditorias de vazamento e sobreajuste.",
      decisions: [
        "Divisão por trajetórias completas e validação agrupada",
        "Cenários com população conhecida, combinações novas e dados fora da distribuição",
        "Controles com alvos permutados, atributos proibidos e auditoria dos escaladores",
      ],
      challenges: [
        "Distinguir ganho real de memorização da população simulada",
        "Comparar estimadores com hipóteses e incertezas diferentes",
        "Medir o efeito do número de pontos disponíveis em cada trajetória",
      ],
      solution:
        "O pipeline executa os métodos sobre os mesmos prefixos de trajetória, calcula erro da curva, taxa de vitória e cobertura, e repete a avaliação em regimes de interpolação e extrapolação.",
      result:
        "Os modelos de machine learning foram melhores no regime conhecido, mas perderam vantagem fora da distribuição. O experimento também encontrou sobreajuste nos modelos de árvore e baixa cobertura dos intervalos de ML.",
    },
  },
  {
    slug: "bank-marketing-targeting",
    number: "06",
    title: "Priorização de clientes com Machine Learning",
    category: "Ranking de clientes",
    statement: "Ordenar contatos para campanhas com capacidade limitada.",
    summary:
      "Ranking para campanhas bancárias com 45.211 registros públicos. No teste reservado, os 10% maiores scores concentraram 45,37% das adesões.",
    role: "Ciência de dados, validação de modelos, analytics e interpretação",
    technologies: ["Python", "Pandas", "scikit learn", "CatBoost", "LightGBM", "SHAP", "Jupyter"],
    metrics: [
      { value: "0,4616", label: "Average Precision no teste" },
      { value: "53,04%", label: "Precision entre os 10% maiores scores" },
      { value: "4,53×", label: "Lift nos 10% maiores scores" },
    ],
    image: localAsset("/images/bank-marketing-prioritization-poster.png"),
    animation: localAsset("/images/bank-marketing-prioritization.gif"),
    imageAlt: "Animação que organiza perfis, contexto financeiro, campanhas anteriores e outros dados em um ranking de prioridade de contato",
    imageStyle: "contain-dark",
    repositoryUrl: "https://github.com/Everlynmartins/bank-marketing-targeting",
    caseStudy: {
      problem:
        "Quando a equipe consegue contatar apenas uma parte da lista, precisa ordenar os clientes para concentrar os contatos onde a taxa observada de adesão é maior.",
      context:
        "O estudo usa 45.211 registros do conjunto público UCI Bank Marketing. A divisão reservou 9.043 registros para avaliação final e a adesão no treino foi 11,7%.",
      responsibility:
        "Preparei os dados, comparei modelos, defini validação e métricas de ranking, avaliei explicações SHAP e documentei limites de uso dos resultados.",
      decisions: [
        "Comparei Regressão Logística, CatBoost e LightGBM com validação cruzada estratificada em 5 folds no treino",
        "Removi duration do modelo operacional, pois essa informação só existe após a ligação",
        "Separei o threshold de F1, escolhido com previsões out of fold, do ranking por capacidade de contato",
      ],
      challenges: [
        "Trabalhar com uma classe positiva minoritária",
        "Evitar variáveis que surgem depois do contato e causam vazamento de informação",
        "Interpretar os resultados retrospectivos sem atribuir efeito causal às ligações",
      ],
      solution:
        "CatBoost obteve a maior Average Precision média na validação cruzada. O score foi usado para ordenar a lista, enquanto Average Precision, Precision at 10%, Lift e Capture avaliaram diferentes aspectos da priorização.",
      result:
        "No grupo reservado, CatBoost alcançou Average Precision de 0,4616. Os 10% de maiores scores tiveram Precision de 53,04%, Lift de 4,53 e concentraram 45,37% das adesões observadas. A divisão é retrospectiva e não comprova desempenho em campanhas futuras nem efeito causal do contato.",
    },
  },
];

export const projects = projectEntries.sort((a, b) => Number(a.number) - Number(b.number));

export const experiences: Experience[] = [
  {
    period: "Mar 2025 a Fev 2026",
    organization: "Embraer, via FIPT e IEL Inova Talentos",
    role: "Cientista de dados",
    location: "Projeto aplicado",
    summary:
      "Análise de falhas e confiabilidade de sistemas aeronáuticos com dados operacionais de frota.",
    details: [
      "Desenvolvimento de 8 pipelines em Python, R e SQL para predição, risco, anomalias e análise de dados operacionais",
      "Preparação de dados com SQL, incluindo limpeza, padronização, reconciliação, joins, CTEs, window functions e feature engineering",
      "Validação com separação temporal, backtesting, análise de sensibilidade, estabilidade e quantificação de incerteza",
      "Definição de KPIs e comunicação dos resultados para públicos técnicos e de negócio",
    ],
    technologies: ["Python", "R", "SQL", "Bayes", "Monte Carlo", "Git"],
  },
  {
    period: "Nov 2020 a Mar 2025",
    organization: "Universidade Federal de Santa Catarina",
    role: "Pesquisador de doutorado",
    location: "Pesquisa acadêmica",
    summary:
      "Pesquisa em modelos estatísticos e transições de fase, com cálculos analíticos e numéricos.",
    details: [
      "Modelagem matemática, cálculos simbólicos e experimentos numéricos reprodutíveis",
      "Métodos variacionais, otimização e análise de sensibilidade",
      "Publicação em periódicos internacionais e apresentação de seminários",
      "Documentação dos cálculos e comparação entre aproximações analíticas",
    ],
    technologies: ["Mathematica", "Python", "C++", "LaTeX", "Linux"],
  },
  {
    period: "Ago 2018 a Jul 2020",
    organization: "Universidade Federal do Paraná",
    role: "Pesquisador de mestrado",
    location: "Pesquisa acadêmica",
    summary:
      "Pesquisa em informação quântica e quantificação de incompatibilidade.",
    details: [
      "Estruturação de problemas matemáticos e comparação entre formulações analíticas",
      "Desenvolvimento de formulações analíticas e ferramentas computacionais",
      "Comunicação técnica, ensino e revisão de resultados",
    ],
    technologies: ["Python", "Álgebra linear", "Informação quântica", "LaTeX"],
  },
];

export const education = [
  {
    period: "2020 a 2025",
    degree: "Doutorado em Física",
    institution: "Universidade Federal de Santa Catarina",
    detail: "Modelos Fermiônicos Planares sob Condições Extremas. Média 9,34 de 10. Bolsa CNPq.",
  },
  {
    period: "2018 a 2020",
    degree: "Mestrado em Física",
    institution: "Universidade Federal do Paraná",
    detail: "Quantificando Incompatibilidade Quântica. Média 9,25 de 10. Bolsa CNPq.",
  },
  {
    period: "2012 a 2016",
    degree: "Bacharelado em Física",
    institution: "Universidade Federal do Paraná",
    detail: "Trabalho de conclusão sobre análise histórica da mecânica newtoniana.",
  },
];

export const technologyGroups = [
  { name: "Dados", technologies: ["Python", "R", "SQL", "Pandas", "NumPy"] },
  { name: "Modelos", technologies: ["PyTorch", "scikit learn", "XGBoost", "CatBoost", "LightGBM", "SHAP"] },
  { name: "Aplicações", technologies: ["FastAPI", "AWS", "PostgreSQL", "Terraform", "Git"] },
];

export const articles: Article[] = [
  {
    slug: "equivalencia-gross-neveu-thirring",
    category: "Teoria quântica de campos",
    title: "Testing the equivalence between the planar Gross Neveu and Thirring models at N = 1",
    publication: "Physical Review D 110, 056048",
    date: "25 set 2024",
    length: "13 páginas",
    description:
      "Estudo da equivalência entre 2 modelos fermiônicos planares no caso N = 1.",
  },
  {
    slug: "transicoes-de-fase-weyl",
    category: "Matéria condensada",
    title: "First order phase transitions within Weyl type of materials at low temperatures",
    publication: "Physical Review B 108, 085107",
    date: "3 ago 2023",
    length: "12 páginas",
    description:
      "Análise de transições de fase de primeira ordem em materiais do tipo Weyl a baixas temperaturas.",
  },
  {
    slug: "incompatibilidade-quantica",
    category: "Informação quântica",
    title: "Quantum incompatibility of a physical context",
    publication: "Physical Review A 102, 050201(R)",
    date: "4 nov 2020",
    length: "6 páginas",
    description:
      "Quantificação da incompatibilidade quântica associada a um contexto físico.",
  },
];

export const exploring = [
  "Monitoramento de modelos",
  "Sistemas de recomendação",
  "Agentes com RAG",
  "Visão computacional e áudio",
];
