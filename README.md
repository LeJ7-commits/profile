# jay-le-portfolio

Personal site of **Jay Jiayang Le**, data engineer at Viaplay and founder of **Nei.10X**.

Built with Astro and Tailwind CSS v4, on a token-driven design system
(see [`design/DESIGN.md`](design/DESIGN.md)).

## Editing content

All copy lives in typed data files. There's no need to touch the components.

| File | Contains |
|------|----------|
| `src/data/profile.ts` | Name, links, manifesto, headline metrics, stack, certifications, education |
| `src/data/experience.ts` | Roles and themed highlights |
| `src/data/projects.ts` | Featured case studies (and the pipeline shown on each cover), "Also built" list |
| `src/data/services.ts` | Nei.10X pitch, services, engagement process |

`npm run build` type-checks these, so a missing field fails the build rather than the page.

## Develop

```bash
npm install
npm run dev      # http://localhost:4321/profile/
npm run build    # astro check + static build to dist/
npm run preview
```

Requires Node 22.12 or later.

## Deploy

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push to `main`.
One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

### Custom domain (e.g. `nei10x.com`)

1. Buy the domain. At-cost registrars such as Cloudflare or Porkbun charge about $10–15 a year; it renews annually.
2. Add DNS records: four `A` records to GitHub Pages' IPs (185.199.108–111.153) for the apex, or a `CNAME` to `lej7-commits.github.io` for a subdomain.
3. Add `public/CNAME` containing the domain.
4. Under **Settings → Secrets and variables → Actions → Variables**, set `SITE_URL=https://yourdomain.com` and `BASE_PATH=/`.
5. Under **Settings → Pages**, enter the domain and tick **Enforce HTTPS**.
