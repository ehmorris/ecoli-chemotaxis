import { ecoliProperties } from "../data.js";

export const drawEcoli = (CTX) => {
  CTX.save();
  CTX.translate(ecoliProperties.boundaryLeft, ecoliProperties.boundaryTop);

  // The x-axis coordinate of the start circle
  const x0 = 160;

  // The y-axis coordinate of the start circle
  const y0 = 70;

  // The radius of the start circle
  const r0 = 80;

  // The x-axis coordinate of the end circle
  const x1 = 180;

  // The y-axis coordinate of the end circle
  const y1 = 100;

  // The radius of the end circle
  const r1 = 170;

  const gradient = CTX.createRadialGradient(x0, y0, r0, x1, y1, r1);
  gradient.addColorStop(0, "#6F559E");
  gradient.addColorStop(1, "#7584AD");

  CTX.fillStyle = gradient;
  CTX.fill(new Path2D(ecoliProperties.boundaryPath));

  CTX.restore();
};
