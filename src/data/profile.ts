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
  { value: '892M', count: { to: 892, post: 'M' }, unit: 'rows', label: 'watched by the DQ platform I built at Viaplay' },
  { value: '0→61', count: { pre: '0→', to: 61 }, unit: 'tables', label: 'under automated checks in my first six weeks' },
  { value: '17×', count: { to: 17, post: '×' }, unit: 'faster', label: 'daily attribution query, 5 min to 17.7 s' },
  { value: '400+→<10', count: { pre: '400+→<', from: 400, to: 10 }, unit: 'per month', label: 'critical data errors a month at Boston Scientific' },
] as const satisfies ReadonlyArray<{
  value: string;
  count: { pre?: string; post?: string; from?: number; to: number };
  unit: string;
  label: string;
}>;

export const stack = [
  { group: 'Languages', items: ['Python', 'SQL (PostgreSQL, T-SQL)', 'TypeScript', 'R'] },
  { group: 'Orchestration & modelling', items: ['Airflow', 'dbt', 'Meltano', 'Dimensional modelling', 'Data contracts'] },
  { group: 'Cloud', items: ['AWS: S3, Redshift, Glue, Lambda, Step Functions', 'Azure: Data Factory, Blob, SQL', 'GCP: BigQuery, Vertex AI'] },
  { group: 'Lakehouse & streaming', items: ['Databricks', 'Delta Lake', 'Structured Streaming', 'PySpark'] },
  { group: 'AI engineering', items: ['MCP servers', 'AI SDK agents', 'LangGraph', 'LLM classification'] },
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
