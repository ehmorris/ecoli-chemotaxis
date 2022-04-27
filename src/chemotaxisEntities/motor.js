import { randomBetween, generateID } from "../helpers.js";
import { motorProperties } from "../data.js";

export class Motor {
  constructor() {
    this.id = generateID();
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
    this.tumbling = false;
  }

  tumble() {
    this.color = motorProperties.tumbleColor;
    this.tumbling = true;
  }

  run() {
    this.color = motorProperties.defaultColor;
    this.tumbling = false;
  }

  draw(CTX) {
    CTX.fillStyle = this.color;
    CTX.fillRect(this.position.x, this.position.y, this.size, this.size);
  }
}
