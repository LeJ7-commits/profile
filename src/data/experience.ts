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
    intro: 'Ad-sales and content data for a Nordic streamer. Highlights from my first six weeks.',
    themes: [
      {
        title: 'Data quality',
        points: [
          { lead: '0 → 61 tables', text: 'under an Airflow data-quality platform I built, watching ~892M rows.' },
          { lead: '52 issues caught early:', text: 'anomalies and freshness gaps, including a silent three-week gap.' },
        ],
      },
      {
        title: 'AI agents',
        points: [
          { lead: '4-tool MCP server', text: 'lets non-engineers ask video-performance questions in plain language, with SQL guards and least-privilege access.' },
          { lead: 'Human-in-the-loop Slack agents', text: 'for platform mapping and franchise classification.' },
        ],
      },
      {
        title: 'Pipelines',
        points: [
          { lead: '5 min → 17.7 s:', text: 'moved two legacy SQL Server feeds onto dbt after five days of exact parity.' },
          { lead: '0.0002% drift:', text: 'daily DK/NO/SE completeness export; a weekly Excel job replaced by dbt.' },
        ],
      },
      {
        title: 'Incidents',
        points: [
          { lead: 'Same-day fix', text: 'for a silent upstream ID change that sent a partner’s entire ad volume to “Unknown” for five days.' },
          { lead: '~39B vs ~6.8M:', text: 'traced an inflated historical total to a grain double-count.' },
        ],
      },
    ],
    more: [
      'The 52 early catches break down as 22 critical row-count anomalies, 16 ad-volume anomalies and 14 freshness gaps.',
      'The MCP agent sits behind an AST-level SQL validator, a least-privilege DB role and 24-hour thread memory.',
      'Franchise classifier: pg_trgm matching first, LLM fallback, 44 unit tests and a weekly re-classification DAG.',
      'Unified four siloed sources into one gold-layer reconciliation view, and built direct-from-source ingestion that removed a legacy SQL Server hop.',
      'A Graph API email-to-FTP bridge on a 15-minute schedule, with 100% successful runs since go-live.',
      'Archived 570 partitions (~203 GB) from Postgres to Azure Blob ahead of a retention cutoff, and added self-healing for the Airflow scheduler, API server and DAG processor.',
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
          { lead: '400+ → single digits', text: 'critical errors a month, within nine months.' },
          { lead: '2.5 weeks → 1–2 days', text: 'reporting cycle, at 97% SLA.' },
          { lead: '1 → 6 people:', text: 'grew the data team and mentored each new analyst.' },
        ],
      },
    ],
  },
];
