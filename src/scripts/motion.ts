/**
 * Page motion, framework-free. Every effect:
 *  - is progressive enhancement (content is final and readable without JS),
 *  - uses transforms/opacity only, driven by the motion tokens in tokens.css,
 *  - is skipped when the visitor prefers reduced motion.
 */

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** One rAF-throttled scroll/resize loop shared by every scroll-linked effect. */
const scrollJobs: Array<() => void> = [];
let ticking = false;
function onScroll(job: () => void) {
  scrollJobs.push(job);
  job();
}
function tick() {
  ticking = false;
  for (const job of scrollJobs) job();
}
function requestTick() {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(tick);
  }
}
window.addEventListener('scroll', requestTick, { passive: true });
window.addEventListener('resize', requestTick);

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/* ── Reveal: blocks and word-rise headings ─────────────────────────────── */
function initReveals() {
  const targets = document.querySelectorAll<HTMLElement>('.reveal, [data-split="rise"]');
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  targets.forEach((el) => io.observe(el));
}

/* ── Scrub: words brighten as the paragraph scrolls through the viewport ─ */
function initScrub() {
  document.querySelectorAll<HTMLElement>('[data-split="scrub"]').forEach((el) => {
    const words = Array.from(el.querySelectorAll<HTMLElement>('.w'));
    el.classList.add('is-scrubbing');
    onScroll(() => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the block's top enters the lower fifth, 1 when its bottom passes mid-screen.
      const p = clamp01((vh * 0.8 - r.top) / (r.height + vh * 0.3));
      const lit = p * words.length;
      words.forEach((w, i) => w.style.setProperty('--lit', String(clamp01(lit - i))));
    });
  });
}

/* ── Counters: numbers count toward their final value once visible ───── */
function initCounters() {
  const els = document.querySelectorAll<HTMLElement>('[data-count-to]');
  const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - 2 ** (-10 * t));
  const render = (el: HTMLElement, v: number) => {
    const d = Number(el.dataset.countDecimals ?? 0);
    el.textContent = `${el.dataset.countPre ?? ''}${v.toFixed(d)}${el.dataset.countPost ?? ''}`;
  };
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        io.unobserve(e.target);
        const el = e.target as HTMLElement;
        const from = Number(el.dataset.countFrom ?? 0);
        const to = Number(el.dataset.countTo);
        const dur = 1800;
        const t0 = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - t0) / dur);
          render(el, from + (to - from) * easeOutExpo(t));
          if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    },
    { threshold: 0.6 },
  );
  els.forEach((el) => {
    render(el, Number(el.dataset.countFrom ?? 0));
    io.observe(el);
  });
}

/* ── Stack: project cards pin and stack; covered cards recede ─────────── */
function initStack() {
  const list = document.querySelector<HTMLElement>('[data-stack]');
  if (!list) return;
  const cards = Array.from(list.querySelectorAll<HTMLElement>('[data-stack-card]'));
  const desktop = window.matchMedia('(min-width: 1024px)');

  const layout = () => {
    // Only stack when every card fits under the nav with room for the offsets;
    // otherwise pinned content would be cut off, so fall back to normal flow.
    list.classList.remove('is-stacking');
    if (!desktop.matches) return;
    const nav = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 66;
    const room = window.innerHeight - nav - cards.length * 14 - 16;
    if (cards.every((c) => c.offsetHeight <= room)) list.classList.add('is-stacking');
  };
  layout();
  window.addEventListener('resize', layout);

  onScroll(() => {
    const stacking = list.classList.contains('is-stacking');
    cards.forEach((card, i) => {
      const next = cards[i + 1];
      if (!stacking || !next) {
        card.style.removeProperty('--covered');
        return;
      }
      const top = parseFloat(getComputedStyle(next).top) || 0;
      const nr = next.getBoundingClientRect();
      // 0 while the next card is a viewport away; 1 once it has pinned on top.
      const p = clamp01(1 - (nr.top - top) / (window.innerHeight - top));
      card.style.setProperty('--covered', p.toFixed(3));
    });
  });
}

/* ── Magnetic pills: buttons lean toward a fine pointer ───────────────── */
function initMagnetic() {
  if (!window.matchMedia('(pointer: fine)').matches) return;
  document.querySelectorAll<HTMLElement>('.pill').forEach((el) => {
    el.classList.add('is-magnetic');
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const y = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      el.style.setProperty('--mx', `${(x * 6).toFixed(2)}px`);
      el.style.setProperty('--my', `${(y * 5).toFixed(2)}px`);
    });
    el.addEventListener('pointerleave', () => {
      el.style.setProperty('--mx', '0px');
      el.style.setProperty('--my', '0px');
    });
  });
}

export function initMotion() {
  if (reduceMotion()) {
    document.documentElement.classList.add('motion-off');
    return;
  }
  initReveals();
  initScrub();
  initCounters();
  initStack();
  initMagnetic();
}
