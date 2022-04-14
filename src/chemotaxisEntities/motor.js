import { randomBetween } from "../helpers.js";
import { motorProperties, canvasProperties } from "../data.js";

export class Motor {
  constructor() {
    this.positions = [
      {
        x: randomBetween(
          canvasProperties.width * 0.82,
          canvasProperties.width * 0.92
        ),
        y: randomBetween(
          canvasProperties.height * 0.2,
          canvasProperties.height - canvasProperties.height * 0.2
        )
      }
    ];
    this.type = "motor";
    this.color = motorProperties.defaultColor;
    this.size = motorProperties.defaultSize;
  }

  lastPosition() {
    return this.positions.at(-1);
  }

  draw(CTX) {
    CTX.fillStyle = this.color;
    const lastPosition = this.lastPosition();
    CTX.fillRect(lastPosition.x, lastPosition.y, this.size, this.size);
  }
}
