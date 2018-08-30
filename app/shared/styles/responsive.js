export const SMALL = 480;
export const MEDIUM = 768;
export const LARGE = 991;
export const XLARGE = 991;

const responsive = {
  smallAndAbove: `@media all and (min-width: ${SMALL}px)`,
  mediumAndAbove: `@media all and (min-width: ${MEDIUM}px)`,
  largeAndAbove: `@media all and (min-width: ${LARGE}px)`,
};

export default responsive;
