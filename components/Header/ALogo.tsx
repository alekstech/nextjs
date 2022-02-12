import React from 'react';

export const Component = ({
  size = 'var(--font-size-0)',
  background = 'var(--text-color)',
  outline = 'var(--background-color)'
}) => {
  const css = `
    .a-logo {
      width: ${size};
      height: ${size};
      stroke: currentColor;
    }
  `;
  return (
    <svg
      className="a-logo"
      viewBox="0 0 285.946 302.327"
      fill="none"
      strokeWidth="3.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <style>
        {css}
      </style>
      <path
        fill={background}
        d="M156.775 1.898l-25.154.11L1.895 280.428l15.675 20h25l32.64-70h137.925l32.64 70h26.348l11.93-25.582L156.775 1.898zm-12.591 80.64l50.312 107.89H93.875l50.309-107.89z"
      />
      <path
        stroke={outline}
        d="M1.907 280.428L131.633 2.008l25.154-.108 127.278 272.947-11.93 25.58h-26.347l-32.64-70H75.221l-32.64 70h-25l-15.675-20M59.548 210.428l-32.64 70M26.907 280.428h-25M42.581 300.428l-15.674-20M156.787 1.9L68.874 190.427M59.548 210.428h144.273M156.685 55.732l-62.81 134.696M203.821 210.428l-59.637-127.89M194.495 190.428H68.875M156.685 55.732l115.45 244.696" />
    </svg>
  );
};

export default Component;
