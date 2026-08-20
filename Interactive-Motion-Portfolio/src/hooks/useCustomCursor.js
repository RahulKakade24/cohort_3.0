import { gsap } from 'gsap';
import { useEffect } from 'react';

export function useCustomCursor(cursorRef, cursorDotRef) {
  useEffect(() => {
    const moveCursor = (e) => {
      if (!cursorRef.current || !cursorDotRef.current) return;
      const { clientX: x, clientY: y } = e;

      gsap.to(cursorRef.current, {
        x: x - 16,
        y: y - 16,
        duration: 0.2,
        ease: 'power2.out'
      });
      gsap.to(cursorDotRef.current, {
        x: x - 4,
        y: y - 4,
        duration: 0.05
      });
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorRef, cursorDotRef]);
}
