import { randomBetween } from "../helpers.js";
import { receptorProperties } from "../data.js";

export class Receptor {
  constructor() {
    this.position = {
      x: randomBetween(
        receptorProperties.boundaryLeft,
        receptorProperties.boundaryRight
      ),
      y: randomBetween(
        receptorProperties.boundaryTop,
        receptorProperties.boundaryBottom
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
