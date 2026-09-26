export const consultancy = {
  name: 'Nei.10X',
  tagline: 'Data platforms that tell you when they’re wrong.',
  pitch:
    'Nei.10X is my independent practice for teams whose reporting has outgrown spreadsheets and heroics. I build the pipelines, the checks that guard them, and the AI tooling that puts the data in front of the people who need it.',
};

export const services = [
  {
    n: '01',
    title: 'Data quality & observability',
    body: 'Automated checks, anomaly detection and alerts written for the people who act on them — so broken numbers stop reaching finance and customers.',
    proof: '0 → 61 tables monitored in six weeks; 400+ monthly errors to single digits.',
  },
  {
    n: '02',
    title: 'Pipelines & the modern data stack',
    body: 'Airflow, dbt and lakehouse builds; migrating off legacy SQL Server hops and Excel builds with measured parity before any cut-over.',
    proof: 'Five days of exact row-count parity before switching feeds; reporting from 2.5 weeks to 1–2 days.',
  },
  {
    n: '03',
    title: 'AI agents on your data',
    body: 'MCP servers and Slack agents that let non-engineers ask questions in plain language — with SQL guards, least-privilege access and a human in the loop for writes.',
    proof: 'Typed MCP tools and a human-gated Slack agent live in production.',
  },
  {
    n: '04',
    title: 'Cloud platform & FinOps',
    body: 'AWS, Azure and GCP foundations in Terraform; query tuning, partitioning and retention that cut both latency and bill.',
    proof: '17× faster attribution query; ~203 GB archived to cold storage safely.',
  },
];

export const process = [
  { step: 'Diagnose', text: 'A short audit of pipelines, models and failure modes, with a prioritised plan.' },
  { step: 'Build', text: 'Shipped in small, validated increments against your production data.' },
  { step: 'Hand over', text: 'Tests, runbooks and alerting your team can own without me.' },
];
