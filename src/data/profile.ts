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
    'I work across the whole data pipeline, from ingestion and dimensional models to quality checks and the tools that let non-engineers query the data themselves. Right now that is ad-sales and content data at Viaplay.',
};

/**
 * Headline numbers. Every figure is taken from shipped production work.
 * `count` drives the count-up animation; `value` is the final, static text.
 */
export const metrics = [
  { value: '62.5%', count: { to: 62.5, post: '%', decimals: 1 }, unit: 'lower', label: 'projected database cost after the PostgreSQL v2 cutover' },
  { value: '94%', count: { to: 94, post: '%' }, unit: 'faster', label: 'daily attribution query after moving legacy feeds onto dbt' },
  { value: '48%', count: { to: 48, post: '%' }, unit: 'faster', label: 'daily content-platform ETL, 96 to ~50 minutes' },
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
  { group: 'AI engineering', items: ['LangGraph', 'OpenAI SDK', 'Nebius Token Factory', 'Tavily'] },
  { group: 'Infrastructure', items: ['Terraform', 'Docker', 'GitHub Actions', 'Git / GitLab'] },
] as const;

/** `href` is the public verification link (a Credly or Databricks credential page). */
export const certifications: { name: string; href?: string }[] = [
  {
    name: 'AWS Certified Solutions Architect, Associate',
    href: 'https://www.credly.com/badges/ca55c3cb-eaa4-4574-beee-2b33da9f7eaf',
  },
  {
    name: 'Databricks Certified Data Engineer Associate',
    href: 'https://credentials.databricks.com/faaf8260-1d25-4858-84f4-62cd30133b05#acc.JieMIZDL',
  },
  {
    name: 'Nebius Agentic AI Builder Certification',
    href: 'https://www.credly.com/badges/03967d4b-00ef-4e4d-8749-53eb02d5650b',
  },
];

export const education = [
  { degree: 'MSc Data Analytics & Business Economics', school: 'Lund University, Sweden', years: '2025–2026' },
  { degree: 'BCom Business Analytics & Applied Economics', school: 'Monash University, Australia', years: '2020–2023' },
];

export const languages = ['English', 'Mandarin', 'Cantonese', 'Bahasa', 'Swedish (learning)'];
