export type Highlight = { title: string; points: string[] };

export type Role = {
  company: string;
  role: string;
  period: string;
  location: string;
  intro?: string;
  themes: Highlight[];
};

/*
 * Viaplay work is grouped by theme rather than by week. Partner platforms
 * are anonymised; metrics are kept.
 */
export const experience: Role[] = [
  {
    company: 'Viaplay',
    role: 'Data Engineer',
    period: 'Aug 2026 — Present',
    location: 'Stockholm',
    intro:
      'Ad-sales and content data for a Nordic streaming service. Highlights from the first six weeks.',
    themes: [
      {
        title: 'Data-quality platform',
        points: [
          'Replaced manual monitoring with an Airflow-native data-quality platform: 0 → 61 tables, 10 check types, ~1,400 check executions a week over ~892M rows (~163 GB) of core gold fact tables.',
          'Caught 22 critical row-count anomalies, 16 ad-volume anomalies, 14 freshness gaps and a silent three-week data gap before any downstream consumer saw them.',
          'Rebuilt the daily Slack alert for a commercial audience rather than engineers, and removed false-positive noise at the source.',
        ],
      },
      {
        title: 'AI agents on production data',
        points: [
          'Architected an MCP server exposing four typed tools to an AI SDK agent, so non-technical stakeholders query video-performance data in plain language — guarded by an AST-level SQL validator, a least-privilege DB role and 24-hour thread memory.',
          'Shipped a proactive Slack agent for platform mapping end to end: two-tier suggestion engine, MCP tools and a human-in-the-loop write gate.',
          'Delivered a franchise-rollup classifier — deterministic pg_trgm matching with an LLM fallback, 44 unit tests, Slack review workflow and weekly re-classification.',
        ],
      },
      {
        title: 'Pipelines & migration',
        points: [
          'Moved two legacy SQL-Server-fed feeds onto the dbt-native gold layer after five consecutive days of exact row-count parity; an index and partition-pruning fix took the downstream attribution query from ~5 min to 17.7 s a day.',
          'Unified four siloed sources into one gold-layer reconciliation view and built direct-from-source ingestion that removed a legacy SQL Server hop.',
          'Replaced a manual weekly Excel ad-availability build with dbt, and shipped a daily DK/NO/SE completeness export that matches source to within 0.0002%.',
          'Built a Graph API email-to-FTP bridge on a 15-minute schedule — 100% successful runs since go-live.',
        ],
      },
      {
        title: 'Incidents & reliability',
        points: [
          'Caught a silent upstream identifier change that routed 100% of a Nordic distribution partner’s ad-delivery volume to “Unknown” for five days — root-caused, fixed and hot-fixed to production the same day.',
          'Root-caused a grain double-count that inflated a FAST platform’s historical totals to ~39B against a ~6.8M baseline.',
          'Archived 570 partitions (~203 GB) from Postgres to Azure Blob ahead of a retention cutoff; added retire/restore retention with a hard-floor guard and self-healing for the Airflow scheduler, API server and DAG processor.',
        ],
      },
    ],
  },
  {
    company: 'Energy Quant Solutions Sweden',
    role: 'Master’s Thesis — Model Validation',
    period: '2026',
    location: 'Lund',
    intro:
      'A unified validation framework for probabilistic energy-market models, in collaboration with EnBW Group. See the project below.',
    themes: [],
  },
  {
    company: 'Boston Scientific',
    role: 'Data Analyst, Data Engineering',
    period: 'Aug 2023 — Jul 2025',
    location: 'Southeast Asia',
    intro:
      'Owned the data infrastructure behind commercial and financial reporting for six regional markets and 200+ stakeholders.',
    themes: [
      {
        title: 'Outcomes',
        points: [
          'Cut high-impact data errors from 400+ a month to single digits within nine months through automated quality checks, anomaly detection and validation rules.',
          'Compressed the reporting cycle from 2.5 weeks to 1–2 days at 97% SLA through indexing, partition pruning and query tuning.',
          'Designed star-schema models in Redshift and PySpark/Glue ETL orchestrated with Step Functions and Lambda.',
          'Grew the data function from one person to six, onboarding and mentoring every new analyst.',
        ],
      },
    ],
  },
];
