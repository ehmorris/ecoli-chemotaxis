export const easeInOutQuad = (progress) =>
  progress < 0.5
    ? 2 * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 2) / 2;

export const easeInOutBack = (progress) => {
  const c1 = 1.70158;
  const c2 = c1 * 1.525;

  return progress < 0.5
    ? (Math.pow(2 * progress, 2) * ((c2 + 1) * 2 * progress - c2)) / 2
    : (Math.pow(2 * progress - 2, 2) * ((c2 + 1) * (progress * 2 - 2) + c2) +
        2) /
        2;
};

export const easeInOutCubic = (progress) =>
  progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;

export const easeInOutSine = (progress) =>
  -(Math.cos(Math.PI * progress) - 1) / 2;
