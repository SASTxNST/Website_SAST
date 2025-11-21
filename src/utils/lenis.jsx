import { useEffect } from 'react';
import Lenis from 'lenis';
import { useSettingsContext } from '../context/SettingsContext';

const useLenis = () => {
  const { getSetting } = useSettingsContext();
  const isSmoothScrollEnabled = getSetting('smoothScroll');

  useEffect(() => {
    let lenisInstance;

    if (isSmoothScrollEnabled) {
      lenisInstance = new Lenis({
        duration: 2.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      function raf(time) {
        lenisInstance.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }

    return () => {
      if (lenisInstance) {
        lenisInstance.destroy();
      }
    };
  }, [isSmoothScrollEnabled]);
};

export default useLenis;