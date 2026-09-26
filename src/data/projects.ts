export type Project = {
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  points: string[];
  /** Pipeline rendered as the monochrome "cover" of the case study. */
  flow: string[];
  stack: string[];
  repo: string;
  demo?: string;
  stat?: { value: string; label: string };
};

const gh = (name: string) => `https://github.com/LeJ7-commits/${name}`;

export const featured: Project[] = [
  {
    slug: 'upv',
    title: 'Unified Probabilistic Validation',
    kicker: 'Master’s thesis · Energy Quant Solutions & EnBW',
    summary:
      'One framework that checks three kinds of energy-market model and gives a GREEN, YELLOW or RED call per dataset.',
    points: [
      'Flagged a solar model that passed coverage checks (91.4%) but was miscalibrated.',
      'AI-written report cards and a live Streamlit demo.',
    ],
    flow: ['DataContract', 'Adapters', 'Diagnostics', 'RegimeTagger', 'DecisionEngine', 'ReportCard'],
    stack: ['Python', 'pytest', 'Streamlit', 'Anthropic API'],
    repo: gh('unified-probabilistic-validation'),
    demo: 'https://unified-probabilistic-validation.streamlit.app',
    stat: { value: '451', label: 'passing tests' },
  },
  {
    slug: 'lakehouse',
    title: 'Streaming Lakehouse',
    kicker: 'Near-real-time ingestion · AWS S3 + Databricks',
    summary: 'Near-real-time clickstream on Databricks, Bronze to Gold, with exactly-once processing.',
    points: [
      'Watermarking, dedup on event_id, and a quarantine table for bad events.',
      'A versioned JSON-Schema contract, so schema drift fails loudly.',
    ],
    flow: ['Producer', 'S3 landing', 'Bronze', 'Silver', 'Gold'],
    stack: ['Databricks', 'Delta Lake', 'PySpark', 'AWS S3', 'Terraform'],
    repo: gh('clickstream-streaming-lakehouse'),
    stat: { value: 'Exactly-once', label: 'processing' },
  },
  {
    slug: 'vertex',
    title: 'Vertex ML Demand Forecasting',
    kicker: 'MLOps · Google Cloud',
    summary: 'Demand forecasts on Vertex AI, from BigQuery features to a monitored endpoint, with conformal intervals.',
    points: [
      'A reproducible KFP pipeline covering training, calibration, registry and deployment.',
      'Drift checks, prediction logging and Terraform-managed infrastructure.',
    ],
    flow: ['BigQuery', 'Features', 'Vertex training', 'Conformal', 'Registry', 'Endpoint'],
    stack: ['Vertex AI', 'BigQuery', 'LightGBM', 'Terraform', 'Cloud Build'],
    repo: gh('vertex-ml-demand-forecasting'),
    stat: { value: '~1.9%', label: 'SMAPE on sample run' },
  },
  {
    slug: 'elt',
    title: 'Open-Source ELT Stack',
    kicker: 'Modern data stack · Airflow + Meltano + dbt',
    summary: 'A daily Postgres pipeline, with Meltano for extract-load, dbt for transforms and Airflow on top.',
    points: [
      'An Airflow DAG with retries and failure alerts.',
      'The whole stack starts with one Docker Compose command.',
    ],
    flow: ['CSV sources', 'Meltano', 'Postgres', 'dbt build', 'Airflow'],
    stack: ['Airflow', 'Meltano', 'dbt', 'PostgreSQL', 'Docker'],
    repo: gh('jay-sandbox-2027'),
  },
  {
    slug: 'daun',
    title: 'Daun',
    kicker: 'AI FinOps · Hackathon build',
    summary: 'A Chrome extension that shows a prompt’s tokens, cost, energy and CO₂ while you type.',
    points: ['Works inside ChatGPT, Claude and Gemini.', 'Usage feeds per-user AI cost dashboards.'],
    flow: ['Prompt', 'Tokens', 'API cost', 'Energy', 'CO₂'],
    stack: ['TypeScript', 'React', 'Supabase', 'Manifest V3'],
    repo: gh('daun'),
    demo: 'https://ibudaun.lovable.app/',
  },
];

export const alsoBuilt = [
  {
    title: 'Double descent in overparameterised MLPs',
    note: 'Teacher–student study of generalisation beyond the interpolation threshold.',
    repo: gh('double-descent-overparameterized-mlps'),
  },
  {
    title: 'Conformal prediction for classification',
    note: 'Coverage-guaranteed prediction sets with Mondrian subgroup reliability.',
    repo: gh('blood-donor-conformal-prediction'),
  },
  {
    title: 'Parkinson’s detection from voice',
    note: 'Classification from BioVoice acoustic features.',
    repo: gh('parkinson-detection-biovoice'),
  },
  {
    title: 'Bi-GRU news-topic classifier',
    note: 'Recurrent NLP model for topic classification.',
    repo: gh('nlp-bi-gru-news-topic'),
  },
];
