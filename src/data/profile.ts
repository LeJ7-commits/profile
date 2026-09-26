export const profile = {
  name: 'Jay Jiayang Le',
  shortName: 'Jay Le',
  role: 'Data Engineer',
  employer: 'Viaplay',
  location: 'Stockholm, Sweden',
  consultancy: 'Nei.10X',
  email: 'jiayangle@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/jiayangle/',
    github: 'https://github.com/LeJ7-commits',
  },
  description:
    'Jay Jiayang Le — data engineer in Stockholm building data-quality platforms, dbt/Airflow pipelines and AI agents on production data. Founder of Nei.10X.',
  manifesto:
    'I build data platforms that notice what’s wrong before anyone downstream does.',
  summary:
    'Data engineer with production experience across media streaming and med-tech. I own pipelines end to end: ingestion, dimensional models, data-quality monitoring and the AI tooling that lets non-engineers ask questions of the data themselves.',
};

/**
 * Headline numbers. Every figure is taken from shipped production work.
 * `count` drives the count-up animation; `value` is the final, static text.
 */
export const metrics = [
  { value: '892M', count: { to: 892, post: 'M' }, unit: 'rows', label: 'under automated data-quality watch across core fact tables' },
  { value: '0→61', count: { pre: '0→', to: 61 }, unit: 'tables', label: 'monitored by a DQ platform built from scratch in six weeks' },
  { value: '17×', count: { to: 17, post: '×' }, unit: 'faster', label: 'daily attribution query — ~5 min down to 17.7 s' },
  { value: '400+→<10', count: { pre: '400+→<', from: 400, to: 10 }, unit: 'per month', label: 'critical data errors, within nine months' },
] as const satisfies ReadonlyArray<{
  value: string;
  count: { pre?: string; post?: string; from?: number; to: number };
  unit: string;
  label: string;
}>;

export const stack = [
  { group: 'Languages', items: ['Python', 'SQL (PostgreSQL, T-SQL)', 'TypeScript', 'R'] },
  { group: 'Orchestration & modelling', items: ['Airflow', 'dbt', 'Meltano', 'Dimensional modelling', 'Data contracts'] },
  { group: 'Cloud', items: ['AWS — S3, Redshift, Glue, Lambda, Step Functions', 'Azure — Data Factory, Blob, SQL', 'GCP — BigQuery, Vertex AI'] },
  { group: 'Lakehouse & streaming', items: ['Databricks', 'Delta Lake', 'Structured Streaming', 'PySpark'] },
  { group: 'AI engineering', items: ['MCP servers', 'AI SDK agents', 'Anthropic / OpenAI APIs', 'LLM classification'] },
  { group: 'Infrastructure', items: ['Terraform', 'Docker', 'GitHub Actions', 'Git / GitLab'] },
] as const;

export const certifications = [
  'AWS Certified Solutions Architect — Associate',
  'Databricks Certified Data Engineer Associate',
];

export const education = [
  { degree: 'MSc Data Analytics & Business Economics', school: 'Lund University, Sweden', years: '2025 — 2026' },
  { degree: 'BCom Business Analytics & Applied Economics', school: 'Monash University, Australia', years: '2020 — 2023' },
];

export const languages = ['English', 'Mandarin', 'Cantonese', 'Bahasa', 'Swedish (learning)'];
