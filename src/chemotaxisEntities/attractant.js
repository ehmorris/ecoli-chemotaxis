import { randomBetween } from "../helpers.js";
import { attractantProperties, canvasProperties } from "../data.js";

export class Attractant {
  constructor() {
    this.positions = [
      {
        x: randomBetween(
          canvasProperties.width * 0,
          canvasProperties.width * 0.12
        ),
        y: randomBetween(
          canvasProperties.height * 0.2,
          canvasProperties.height - canvasProperties.height * 0.2
        )
      }
    ];
    this.type = "attractant";
    this.color = attractantProperties.defaultColor;
    this.size = attractantProperties.defaultSize;
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
