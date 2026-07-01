import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal<T extends HTMLElement>(
  options?: {
    delay?: number;
    y?: number;
    x?: number;
    scale?: number;
    duration?: number;
    stagger?: number;
  }
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const children = el.querySelectorAll('.reveal-child');
    const targets = children.length > 0 ? children : el;

    gsap.set(targets, {
      opacity: 0,
      y: options?.y ?? 40,
      x: options?.x ?? 0,
      scale: options?.scale ?? 1,
    });

    const tween = gsap.to(targets, {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      duration: options?.duration ?? 0.8,
      stagger: options?.stagger ?? (children.length > 1 ? 0.12 : 0),
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
      delay: options?.delay ?? 0,
    });

    return () => {
      tween.kill();
    };
  }, []);

  return ref;
}

export function useParallax<T extends HTMLElement>(speed: number = 0.3) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tween = gsap.to(el, {
      y: () => speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });

    return () => { tween.kill(); };
  }, [speed]);

  return ref;
}
