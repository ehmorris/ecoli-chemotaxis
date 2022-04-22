import { randomBetween } from "../helpers.js";
import { motorProperties, canvasProperties } from "../data.js";

export class Motor {
  constructor() {
    this.position = {
      x: randomBetween(
        motorProperties.boundaryLeft,
        motorProperties.boundaryRight
      ),
      y: randomBetween(
        motorProperties.boundaryTop,
        motorProperties.boundaryBottom
      )
    };
    this.type = "motor";
    this.color = motorProperties.defaultColor;
    this.size = motorProperties.defaultSize;
  }

  tumble() {
    this.color = motorProperties.tumbleColor;
  }

  run() {
    this.color = motorProperties.defaultColor;
  }

  draw(CTX) {
    CTX.fillStyle = this.color;
    CTX.fillRect(this.position.x, this.position.y, this.size, this.size);
  }
}
