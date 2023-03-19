import React from 'react';

export const Component = ({
  ariaHidden = true
}) => {
  return (
    <svg
      className="a-logo"
      viewBox="0 0 285.946 302.327"
      fill="none"
      strokeWidth="3.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={ariaHidden}
    >
      <style>
        {`
          .a-logo {
            width: var(--font-size-0);
            height: var(--font-size-0);
          }
        `}
      </style>
      <path
        id="fill"
        fill="var(--text-color)"
        d="m 129.19598,1.898 25.154,0.11 129.726,278.42 -15.675,20 h -25 l -32.64,-70 H 72.835981 l -32.64,70 h -26.348 L 1.9179806,274.846 Z m 12.591,80.64 -50.311999,107.89 H 192.09598 Z"
      />
      <path
        id="outline"
        stroke="var(--background-color)"
        d="M 284.06398,280.428 154.33798,2.008 129.18398,1.9 1.9059806,274.847 13.835981,300.427 h 26.347 l 32.64,-70 H 210.74998 l 32.64,70 h 25 l 15.675,-20 m -57.642,-69.999 32.64,70 m 0.001,0 h 25 m -40.674,20 15.674,-20 M 129.18398,1.9 l 87.913,188.527 m 9.326,20.001 H 82.149981 m 47.135999,-154.696 62.81,134.696 m -109.945999,20 59.636999,-127.89 M 91.475981,190.428 H 217.09598 M 129.28598,55.732 13.835981,300.428" />
    </svg>
  );
};

export default Component;
