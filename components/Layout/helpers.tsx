export function getCSSVariable(variable: string): any {
  let value = "";
  if (process.browser) {
    value = getComputedStyle(document.body).getPropertyValue(`--${variable}`);
  }
  return value;
}

export function getAdjustedSpace(space: string): string {
  return space === "0" ? "0px" : space;
}
