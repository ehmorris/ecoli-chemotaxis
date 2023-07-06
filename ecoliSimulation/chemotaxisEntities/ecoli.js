import { ecoliProperties } from "../data.js";

const eColiImage = new Image();
eColiImage.src = "./ecoliSimulation/images/EColiBody.png";

const padding = 18;

export const drawEcoli = (CTX) => {
  CTX.save();
  CTX.translate(ecoliProperties.boundaryLeft, ecoliProperties.boundaryTop);

  CTX.fillStyle = "rgba(255, 255, 255, .15)";
  CTX.fill(new Path2D(ecoliProperties.boundaryPath));

  CTX.drawImage(
    eColiImage,
    -padding / 2,
    -padding / 2,
    ecoliProperties.width + padding,
    ecoliProperties.height + padding
  );

  CTX.restore();
};
