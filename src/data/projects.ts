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
    kicker: 'Model governance · Master’s thesis with Energy Quant Solutions & EnBW',
    summary:
      'One reliability framework that validates Monte Carlo, short-term and long-term renewable energy models in a shared probabilistic space, and returns a single GREEN / YELLOW / RED governance decision per dataset.',
    points: [
      'Data contract → adapters → diagnostics (PIT, CRPS, pinball, Basel-style interval backtests) → regime-aware thresholds → decision engine.',
      'Found that a solar model passing coverage-only checks (91.4%) was structurally miscalibrated — a failure a coverage-only regulator would miss.',
      'AI-generated technical and plain-language report cards via the Anthropic API; live Streamlit app.',
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
    kicker: 'Near real-time ingestion · AWS S3 + Databricks',
    summary:
      'Clickstream pipeline on a Bronze / Silver / Gold medallion architecture with exactly-once guarantees and a versioned data contract.',
    points: [
      'Micro-batch Structured Streaming from S3 into Delta Lake with checkpointed, replay-safe restarts.',
      'Event-time watermarking, stateful deduplication on event_id, and quarantine routing for schema-violating events.',
      'Versioned JSON-Schema contract; explicit schemas at read time so drift is caught, never silently ignored.',
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
    summary:
      'Production-style forecasting system with conformal prediction intervals, from BigQuery features to a monitored online endpoint.',
    points: [
      'Reproducible Vertex AI Pipeline (KFP): feature engineering, LightGBM training, conformal calibration, model registry, endpoint.',
      'Prediction logging and daily feature-drift checks with an operational runbook.',
      'Infrastructure in Terraform, CI on GitHub Actions, explicit cost controls.',
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
    summary:
      'A containerised daily inventory pipeline wiring Singer extract-load, dbt transformations and Airflow orchestration into Postgres.',
    points: [
      'Meltano tap-csv → target-postgres, then dbt build, orchestrated as an Airflow TaskFlow DAG with retries and failure alerting.',
      'One-command local environment via Docker Compose with a health-checked warehouse.',
    ],
    flow: ['CSV sources', 'Meltano', 'Postgres', 'dbt build', 'Airflow'],
    stack: ['Airflow', 'Meltano', 'dbt', 'PostgreSQL', 'Docker'],
    repo: gh('jay-sandbox-2027'),
  },
  {
    slug: 'daun',
    title: 'Daun',
    kicker: 'AI FinOps · Hackathon build',
    summary:
      'Carbon- and cost-aware AI prompting. A Chrome extension and web calculator that turn every prompt into tokens, API cost, energy and CO₂ — live, where you type.',
    points: [
      'Manifest V3 extension injecting a live HUD into ChatGPT, Claude and Gemini.',
      'Usage telemetry into Supabase powering per-user AI FinOps dashboards.',
    ],
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
