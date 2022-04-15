import { randomBetween } from "../helpers.js";
import { motorProperties, canvasProperties } from "../data.js";

export class Motor {
  constructor() {
    this.position = {
      x: randomBetween(
        canvasProperties.width * 0.82,
        canvasProperties.width * 0.92
      ),
      y: randomBetween(
        canvasProperties.height * 0.2,
        canvasProperties.height - canvasProperties.height * 0.2
      )
    };
    this.type = "motor";
    this.color = motorProperties.defaultColor;
    this.size = motorProperties.defaultSize;
  }

  draw(CTX) {
    CTX.fillStyle = this.color;
    CTX.fillRect(this.position.x, this.position.y, this.size, this.size);
  }
}
