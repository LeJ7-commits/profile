export const profile = {
  name: 'Jay Jiayang Le',
  shortName: 'Jay Le',
  role: 'Data Engineer',
  employer: 'Viaplay',
  location: 'Stockholm, Sweden',
  city: 'Stockholm',
  email: 'jiayangle@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/jiayangle/',
    github: 'https://github.com/LeJ7-commits',
  },
  description:
    'Jay Jiayang Le, data engineer at Viaplay in Stockholm. I build data-quality platforms, Airflow and dbt pipelines, and AI agents on production data.',
  manifesto:
    'I build data platforms that notice what’s wrong before anyone downstream does.',
  summary:
    'I work across the whole pipeline: ingestion, dimensional models, data-quality checks, and the AI tools that let non-engineers query data themselves. Right now that’s ad-sales and content data at Viaplay.',
};

/**
 * Headline numbers. Every figure is taken from shipped production work.
 * `count` drives the count-up animation; `value` is the final, static text.
 */
export const metrics = [
  { value: '62.5%', count: { to: 62.5, post: '%', decimals: 1 }, unit: 'lower', label: 'projected database cost after the PostgreSQL v2 cutover' },
  { value: '94%', count: { to: 94, post: '%' }, unit: 'faster', label: 'daily attribution query after moving legacy feeds onto dbt' },
  { value: '41%', count: { to: 41, post: '%' }, unit: 'lower', label: 'forecast error on Nordic ad-inventory forecasts' },
  { value: '97%', count: { to: 97, post: '%' }, unit: 'fewer', label: 'critical data errors a month at Boston Scientific' },
] as const satisfies ReadonlyArray<{
  value: string;
  count: { pre?: string; post?: string; from?: number; to: number; decimals?: number };
  unit: string;
  label: string;
}>;

export const stack = [
  { group: 'Languages', items: ['Python', 'SQL (PostgreSQL, T-SQL)', 'TypeScript', 'R'] },
  { group: 'Orchestration & transformation', items: ['Airflow', 'dbt', 'Meltano'] },
  { group: 'Cloud', items: ['AWS: S3, Redshift, Glue, Lambda, Step Functions', 'Azure: Data Factory, Blob, SQL', 'GCP: BigQuery, Vertex AI'] },
  { group: 'Lakehouse & streaming', items: ['Databricks', 'Delta Lake', 'Structured Streaming', 'PySpark'] },
  { group: 'AI engineering', items: ['MCP', 'AI SDK', 'LangGraph'] },
  { group: 'Infrastructure', items: ['Terraform', 'Docker', 'GitHub Actions', 'Git / GitLab'] },
] as const;

export const certifications = [
  'AWS Certified Solutions Architect, Associate',
  'Databricks Certified Data Engineer Associate',
];

export const education = [
  { degree: 'MSc Data Analytics & Business Economics', school: 'Lund University, Sweden', years: '2025–2026' },
  { degree: 'BCom Business Analytics & Applied Economics', school: 'Monash University, Australia', years: '2020–2023' },
];

export const languages = ['English', 'Mandarin', 'Cantonese', 'Bahasa', 'Swedish (learning)'];
