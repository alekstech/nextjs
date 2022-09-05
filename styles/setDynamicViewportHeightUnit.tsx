export const setDynamicViewportHeightUnit = () => {
  const setProperty = () => requestAnimationFrame(() => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--dvh', `${vh}px`);
  });
  window.addEventListener('resize', () => {
    setProperty();
  });
  setProperty();
};

export default setDynamicViewportHeightUnit;
