import { useEffect } from "react";

/**
 * Hook to add scroll reveal animations to elements with the 'reveal' class
 */
const useScrollReveal = () => {
  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");
    if (!revealElements.length) return;

    if (!("IntersectionObserver" in window)) {
      revealElements.forEach((element) => element.classList.add("active"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -120px 0px" });

    revealElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
};

export default useScrollReveal;
