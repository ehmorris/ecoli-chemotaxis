import { generateID } from "../helpers.js";
import { motorProperties } from "../data.js";

export class Motor {
  constructor() {
    this.id = generateID();
    this.position = motorProperties.positionsAndRotations.pop();
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
    const shapeCenter = {
      x: this.position.x + this.size / 2,
      y: this.position.y + this.size / 2,
    };
    const rotationAmount = (Math.PI / 180) * this.position.r;

    CTX.save();
    CTX.fillStyle = this.color;
    CTX.strokeStyle = "#010103";
    CTX.translate(shapeCenter.x, shapeCenter.y);
    CTX.rotate(rotationAmount);
    CTX.translate(-this.size / 2, -this.size / 2);
    CTX.fill(new Path2D(motorProperties.shapePath));
    CTX.stroke(new Path2D(motorProperties.shapePath));
    CTX.restore();
  }
}
