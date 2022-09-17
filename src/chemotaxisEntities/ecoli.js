import { ecoliProperties } from "../data.js";

export class Ecoli {
  draw(CTX) {
    CTX.save();
    CTX.translate(ecoliProperties.boundaryLeft, ecoliProperties.boundaryTop);
    CTX.strokeStyle = "white";
    CTX.stroke(new Path2D(ecoliProperties.boundaryPath));
    CTX.restore();
  }
}
