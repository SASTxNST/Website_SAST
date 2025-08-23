import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Check if Lenis is controlling scroll
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: false }); // smooth scroll
    } else {
      // fallback in case Lenis is not ready
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname]);

  return null;
}
