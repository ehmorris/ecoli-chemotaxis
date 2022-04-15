import { randomBetween } from "../helpers.js";
import { receptorProperties, canvasProperties } from "../data.js";

export class Receptor {
  constructor() {
    this.position = {
      x: randomBetween(
        canvasProperties.width * 0.12,
        canvasProperties.width * 0.24
      ),
      y: randomBetween(
        canvasProperties.height * 0.2,
        canvasProperties.height - canvasProperties.height * 0.2
      )
    };
    this.type = "receptor";
    this.color = receptorProperties.defaultColor;
    this.size = receptorProperties.defaultSize;
    this.active = true;
  }

  draw(CTX) {
    CTX.fillStyle = this.color;
    CTX.fillRect(this.position.x, this.position.y, this.size, this.size);
  }
}
