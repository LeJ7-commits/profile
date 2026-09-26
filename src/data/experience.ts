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
};

/*
 * Written for a 15-second skim: max two bullets per theme, each leading with its number.
 * Viaplay partner platforms are anonymised; metrics are exact.
 */
export const experience: Role[] = [
  {
    company: 'Viaplay',
    role: 'Data Engineer',
    period: 'Aug 2026 – present',
    location: 'Stockholm',
    intro: 'Ad-sales and content data for a Nordic streamer. What my first seven weeks changed for the business.',
    themes: [
      {
        title: 'Cost',
        points: [
          { lead: '62.5% lower database cost (projected):', text: 'led the PostgreSQL v2 cutover, 731 tables verified row for row, and right-sized storage.' },
          { lead: '77% less registry storage', text: 'after a cleanup, cutting a recurring storage bill.' },
        ],
      },
      {
        title: 'Speed',
        points: [
          { lead: '48% and 30% faster', text: 'daily ETL for content-platform and video-performance data; the attribution query is 94% faster.' },
          { lead: '89% smaller exec report,', text: 'so executive summaries and inventory views load faster.' },
        ],
      },
      {
        title: 'Revenue accuracy',
        points: [
          { lead: '18× and 10× overstatement fixed', text: 'in ad-inventory availability for two partner platforms, now reconciled against stakeholder reporting.' },
          { lead: '41% lower forecast error', text: 'on a new Nordic ad-inventory forecast combining demand, sell-through and product mapping.' },
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
    more: [
      'The PostgreSQL v2 cutover moved ~385 GB with exact row counts across all 731 tables; minute-level ad-delivery telemetry and hourly ad-insights jobs moved from an on-prem server to Airflow at the same switch.',
      'Inventory forecast accuracy measured out of sample, country by week (wMAPE 45.1% to 26.5%).',
      'Same-day fix for a silent upstream ID change that had sent 100% of a partner’s ad volume to “Unknown” for five days.',
      'Traced a grain double-count that inflated a historical total ~5,700× (~39B against a ~6.8M baseline).',
      'The 52 early catches: 22 critical row-count anomalies, 16 ad-volume anomalies and 14 freshness gaps, across 61 tables and ~892M rows.',
      'The daily DK/NO/SE completeness export matches source to 99.9998%.',
      'The MCP agent sits behind an AST-level SQL validator, a least-privilege DB role and 24-hour thread memory; the franchise classifier uses pg_trgm first with an LLM fallback and 44 unit tests.',
      'Archived ~203 GB of old partitions to Azure Blob ahead of a retention cutoff, and added self-healing for the Airflow scheduler, API server and DAG processor.',
    ],
  },
  {
    company: 'Energy Quant Solutions Sweden',
    role: 'Master’s thesis, model validation',
    period: '2026',
    location: 'Lund',
    intro: 'Built a validation framework for probabilistic energy models, with EnBW Group. Details under Featured projects.',
    themes: [],
  },
  {
    company: 'Boston Scientific',
    role: 'Data Analyst, data engineering',
    period: 'Aug 2023 – Jul 2025',
    location: 'Southeast Asia',
    intro: 'I owned the reporting pipelines for six markets and 200+ stakeholders.',
    themes: [
      {
        title: 'Outcomes',
        points: [
          { lead: '97% fewer critical data errors', text: 'within nine months, through automated quality checks.' },
          { lead: '~90% faster reporting cycle', text: '(2.5 weeks to 1–2 days) at 97% SLA.' },
          { lead: '6× larger data team:', text: 'grew it from one person and mentored each new analyst.' },
        ],
      },
    ],
  },
];
