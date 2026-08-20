import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useGsap() {
  const [gsapLoaded, setGsapLoaded] = useState(false);

  useEffect(() => {
    setGsapLoaded(true);

    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } });

    heroTl
      .fromTo('.hero-status', { y: -15, opacity: 0 }, { y: 0, opacity: 1, delay: 0.1 })
      .fromTo('.hero-heading', { y: 25, opacity: 0 }, { y: 0, opacity: 1 }, '-=0.4')
      .fromTo('.hero-sub', { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, '-=0.4')
      .fromTo('.hero-actions', { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, '-=0.3')
      .fromTo('.bento-item', { scale: 0.95, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.08 }, '-=0.3');

    gsap.utils.toArray('.gsap-header').forEach((header) => {
      gsap.fromTo(
        header,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: header, start: 'top 85%' }
        }
      );
    });

    gsap.fromTo(
      '.gsap-card',
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.gsap-card-grid', start: 'top 80%' }
      }
    );

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return gsapLoaded;
}
