/** A highlight opens with a short bold lead (usually the number), then one plain sentence. */
export type Point = { lead: string; text: string };
export type Highlight = { title: string; points: Point[] };

export type Role = {
  company: string;
  role: string;
  period: string;
  location: string;
  intro?: string;
  themes: Highlight[];
  /** Extra detail, shown behind a "More" disclosure so the default view stays skimmable. */
  more?: string[];
  links?: { label: string; href: string }[];
};

/*
 * Written for a 15-second skim: max two bullets per theme, each leading with its number.
 * Viaplay partner platforms are anonymised; metrics are exact.
 */
export const experience: Role[] = [
  {
    company: 'Viaplay',
    role: 'Data Engineer',
    period: 'Aug 2026 to present',
    location: 'Stockholm',
    intro: 'Ad-sales and content data for a Nordic streamer.',
    themes: [
      {
        title: 'Cost',
        points: [
          { lead: '62.5% lower database cost (projected):', text: 'led the PostgreSQL v2 cutover (~385 GB, 731 tables, exact row counts) and right-sized storage.' },
          { lead: '~50% lower monthly cost', text: 'for the Airflow container.' },
          { lead: '77% less registry storage', text: 'after a cleanup.' },
        ],
      },
      {
        title: 'Speed',
        points: [
          { lead: '48% and 30% faster', text: 'daily ETL for content-platform and video-performance data; the attribution query is 94% faster.' },
          { lead: '89% smaller exec report,', text: 'so summaries and inventory views load faster.' },
        ],
      },
      {
        title: 'Data quality & automation',
        points: [
          { lead: '100% automated data-quality monitoring', text: 'on the core ad-sales tables, catching 52 issues before they reached reporting.' },
          { lead: 'Manual steps automated:', text: 'a weekly Excel build moved to dbt, and an email-to-FTP ingest step with 100% successful runs.' },
        ],
      },
      {
        title: 'AI agents',
        points: [
          { lead: '4-tool MCP server', text: 'lets non-engineers ask video-performance questions in plain language, with SQL guards and least-privilege access.' },
          { lead: 'Human-in-the-loop Slack agents', text: 'for platform mapping and franchise classification.' },
        ],
      },
    ],
  },
  {
    company: 'Energy Quant Solutions Sweden',
    role: 'Master’s thesis, model validation',
    period: '2026',
    location: 'Lund',
    intro: 'A validation framework for probabilistic energy-market models, built with EnBW Group. It gives one GREEN, YELLOW or RED call per dataset.',
    themes: [
      {
        title: 'Outcomes',
        points: [
          { lead: 'Caught what coverage checks miss:', text: 'a solar model with 91.4% coverage that was still miscalibrated.' },
          { lead: '451 tests,', text: 'AI-written report cards and a live demo.' },
        ],
      },
    ],
    links: [
      { label: 'Repository', href: 'https://github.com/LeJ7-commits/unified-probabilistic-validation' },
      { label: 'Live demo', href: 'https://unified-probabilistic-validation.streamlit.app' },
    ],
  },
  {
    company: 'Boston Scientific',
    role: 'Data Analyst, data engineering',
    period: 'Aug 2023 to Jul 2025',
    location: 'Southeast Asia',
    intro: 'Two years owning the data infrastructure behind commercial and financial reporting for six markets and 200+ stakeholders.',
    themes: [
      {
        title: 'Data quality',
        points: [
          { lead: '97% fewer critical data errors:', text: 'from 400+ a month to single digits within nine months.' },
          { lead: 'Automated checks and anomaly detection', text: 'on transactional data, plus fixes to existing pipelines that cut manual work.' },
        ],
      },
      {
        title: 'Speed',
        points: [
          { lead: '~90% faster reporting cycle:', text: '2.5 weeks became 1 to 2 days, at 97% SLA.' },
          { lead: 'Indexing, partition pruning and query tuning', text: 'behind the speed-up.' },
        ],
      },
      {
        title: 'Platform',
        points: [
          { lead: 'Star-schema models in AWS Redshift', text: 'for KPI and financial reporting across six markets.' },
          { lead: 'PySpark and Glue ETL', text: 'run by Step Functions and Lambda, pulling internal and third-party sources into one pipeline.' },
        ],
      },
      {
        title: 'Team',
        points: [
          { lead: '6× larger team:', text: 'grew the data function from one person to six.' },
          { lead: 'Full ownership of the infrastructure,', text: 'onboarding and mentoring each new analyst.' },
        ],
      },
    ],
  },
];
