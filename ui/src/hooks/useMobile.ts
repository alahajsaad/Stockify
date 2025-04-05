import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => 
    typeof window !== "undefined" 
      ? window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`).matches
      : false
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    const handleChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);  // <- Triggers re-render
    };

    mediaQuery.addEventListener("change", handleChange);
    setIsMobile(mediaQuery.matches); // <- Ensures initial state is correct

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isMobile;
}
