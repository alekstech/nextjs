import { useEffect } from "react";

export const usePreferredColorScheme = function () {
  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    }

    window
      .matchMedia("(prefers-color-scheme: light)")
      .addEventListener("change", (event) => {
        if (event.matches) {
          document.body.classList.remove("dark");
          document.body.classList.add("light");
        } else {
          document.body.classList.remove("light");
          document.body.classList.add("dark");
        }
      });
  }, []);
};

export default usePreferredColorScheme;
