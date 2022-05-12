export const setDynamicViewportHeightUnit = () => {
  window.addEventListener('resize', () => {
    requestAnimationFrame(() => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--dvh', `${vh}px`);
    });
  });
};

export default setDynamicViewportHeightUnit;
