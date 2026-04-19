'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const docEl = document.documentElement;
    docEl.classList.add('js-scroll-reveal');
    const selector =
      '.animate-fade-in-up, .animate-fade-in-left, .animate-fade-in-right, .animate-fade-in-down, .animate-zoom-in-soft';

    const animatedNodes = Array.from(document.querySelectorAll<HTMLElement>(selector));
    if (!animatedNodes.length) {
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const observedNodes = new WeakSet<HTMLElement>();

    if (prefersReducedMotion) {
      animatedNodes.forEach((node) => node.classList.add('reveal-in'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const target = entry.target as HTMLElement;
          target.classList.add('reveal-in');
          observer.unobserve(target);
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.15,
      }
    );

    const queueNode = (node: HTMLElement) => {
      if (node.classList.contains('reveal-in') || observedNodes.has(node)) {
        return;
      }

      observedNodes.add(node);
      observer.observe(node);
    };

    animatedNodes.forEach(queueNode);

    // Watch for elements rendered after initial mount (e.g., conditional UI/state changes).
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((addedNode) => {
          if (!(addedNode instanceof HTMLElement)) {
            return;
          }

          if (addedNode.matches(selector)) {
            queueNode(addedNode);
          }

          addedNode.querySelectorAll<HTMLElement>(selector).forEach(queueNode);
        });
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      docEl.classList.remove('js-scroll-reveal');
    };
  }, [pathname]);

  return null;
}
