import { randomBetween } from "../helpers.js";
import { attractantProperties, canvasProperties } from "../data.js";

export class Attractant {
  constructor() {
    this.position = {
      x: randomBetween(
        canvasProperties.width * 0,
        canvasProperties.width * 0.12
      ),
      y: randomBetween(
        canvasProperties.height * 0.2,
        canvasProperties.height - canvasProperties.height * 0.2
      )
    };
    this.type = "attractant";
    this.color = attractantProperties.defaultColor;
    this.size = attractantProperties.defaultSize;
  }

  draw(CTX) {
    CTX.fillStyle = this.color;
    CTX.fillRect(this.position.x, this.position.y, this.size, this.size);
  }
}
