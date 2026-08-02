/**
 * Site-wide scroll behaviour: ScrollSmoother for inertial scrolling, plus
 * ScrollTrigger-driven reveals. Loaded once from Layout.astro so every page
 * gets the same treatment — previously this lived inline in index.astro and
 * the other four pages had no scroll animation at all.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

const REVEAL = '.scroll-reveal';
// Matches the h-20 fixed header, so anchored sections don't land underneath it.
const HEADER_OFFSET = 80;

/**
 * gsap.matchMedia() rather than a bare window.matchMedia check: it reverts
 * every animation and ScrollTrigger created inside the callback when the query
 * stops matching. A user flipping "reduce motion" mid-session gets a clean
 * teardown instead of elements stranded mid-transform.
 */
const mm = gsap.matchMedia();

// Tells the failsafe in Layout.astro that this module got far enough to take
// responsibility for revealing content. Set before any animation work so a
// throw further down still leaves the page readable.
document.documentElement.classList.add('scroll-ready');

mm.add('(prefers-reduced-motion: reduce)', () => {
  // No smoothing and no reveal animation — just make sure nothing is left
  // hidden by the pre-JS CSS state.
  gsap.set(REVEAL, { opacity: 1, y: 0 });
});

mm.add('(prefers-reduced-motion: no-preference)', () => {
  const smoother = ScrollSmoother.create({
    wrapper: '#smooth-wrapper',
    content: '#smooth-content',
    // Seconds for the content to catch up to the real scroll position. Past
    // ~1.5 it reads as laggy rather than smooth on a long page like /founder.
    smooth: 1,
    // Leave touch devices on native scroll. Smoothing a touch scroll fights
    // the platform's own momentum and is the main reason smooth-scroll libs
    // feel broken on phones.
    smoothTouch: false,
    effects: true,
  });

  /**
   * Reveals, batched. The previous code created one ScrollTrigger per element
   * with its own tween; batch() groups everything entering the viewport in the
   * same frame into a single staggered tween, which is both cheaper and reads
   * as one deliberate motion instead of N independent ones.
   */
  ScrollTrigger.batch(REVEAL, {
    start: 'top 85%',
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        overwrite: true,
      }),
  });

  // Anything already above the fold on load should not wait for a scroll.
  ScrollTrigger.refresh();

  return () => smoother.kill();
});

/**
 * Pinned sidebars. `position: sticky` does not survive ScrollSmoother — the
 * smoother drives the page by transforming #smooth-content, and the sticky
 * element rides that transform straight off the top of the viewport instead of
 * holding position. ScrollTrigger's pin is the GSAP-native equivalent and is
 * transform-aware.
 *
 * Declarative so this stays page-agnostic: mark the element to hold with
 * data-pin, and the container it should stay within with data-pin-container.
 */
mm.add('(prefers-reduced-motion: no-preference) and (min-width: 768px)', () => {
  const pinned = document.querySelector<HTMLElement>('[data-pin]');
  const container = document.querySelector<HTMLElement>('[data-pin-container]');
  if (!pinned || !container) return;

  ScrollTrigger.create({
    trigger: pinned,
    start: `top ${HEADER_OFFSET + 16}px`,
    endTrigger: container,
    end: 'bottom bottom',
    pin: true,
    // The grid cell is already sized by the much taller prose column beside
    // it, so reserving extra space would just add a gap under the container.
    pinSpacing: false,
    invalidateOnRefresh: true,
  });
});

/**
 * Anchor navigation. ScrollSmoother drives the page with a transform, so the
 * browser's native hash jump lands at the wrong offset (and skips the easing).
 * Route same-page anchors through the smoother instead, and fall back to
 * scrollIntoView when smoothing is off for reduced-motion users.
 */
const scrollToTarget = (target: Element, animate: boolean) => {
  const smoother = ScrollSmoother.get();
  if (smoother) {
    smoother.scrollTo(target, animate, `top ${HEADER_OFFSET}px`);
  } else {
    const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top, behavior: animate ? 'smooth' : 'auto' });
  }
};

document.addEventListener('click', (event) => {
  const link = (event.target as Element | null)?.closest?.('a[href*="#"]');
  if (!(link instanceof HTMLAnchorElement)) return;

  const url = new URL(link.href, window.location.href);
  // Only hijack anchors pointing at a section of the page we're already on.
  if (url.pathname !== window.location.pathname || !url.hash) return;

  const target = document.querySelector(url.hash);
  if (!target) return;

  event.preventDefault();
  scrollToTarget(target, true);
  history.pushState(null, '', url.hash);

  // preventDefault() also cancels the focus move a native hash jump performs,
  // which would silently break the "Skip to main content" link for keyboard
  // and screen-reader users. Reinstate it: tabindex="-1" makes a non-
  // interactive target programmatically focusable without adding it to the
  // tab order, and preventScroll stops the browser undoing the smooth scroll.
  if (target instanceof HTMLElement) {
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  }
});

// Cross-page anchors (e.g. /#impact from /about) arrive with the hash already
// set. Wait a frame so ScrollSmoother has measured the page before jumping.
if (window.location.hash) {
  const target = document.querySelector(window.location.hash);
  if (target) {
    requestAnimationFrame(() => scrollToTarget(target, false));
  }
}

/**
 * Images are lazy-loaded below the fold, so trigger positions computed before
 * they land are wrong once they push content down. Astro's <Image> emits
 * width/height (so layout is reserved), but webfonts and the film-grain layer
 * can still shift things — a refresh once everything settles is cheap
 * insurance against reveals firing at the wrong scroll position.
 */
window.addEventListener('load', () => ScrollTrigger.refresh());
