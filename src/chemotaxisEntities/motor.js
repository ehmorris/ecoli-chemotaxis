import { randomBetween, generateID } from "../helpers.js";
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

  drawMotor(CTX) {
    const shapeCenter = {
      x: this.position.x + this.size / 2,
      y: this.position.y + this.size / 2,
    };
    const rotationAmount = (Math.PI / 180) * this.position.r;

    CTX.fillStyle = this.color;
    CTX.strokeStyle = "#010103";
    CTX.save();
    CTX.translate(shapeCenter.x, shapeCenter.y);
    CTX.rotate(rotationAmount);
    CTX.translate(-this.size / 2, -this.size / 2);
    CTX.fill(new Path2D(motorProperties.shapePath));
    CTX.stroke(new Path2D(motorProperties.shapePath));
    CTX.restore();
  }

  drawFlagella(CTX) {
    // The x-axis coordinate of the first control point
    const cp1x = this.position.x + 90;

    // The y-axis coordinate of the first control point
    const cp1y = this.position.y + 130;

    // The x-axis coordinate of the second control point
    const cp2x = this.position.x + 150;

    // The y-axis coordinate of the second control point
    const cp2y = this.position.y - 20;

    // The x-axis coordinate of the end point
    const x = this.position.x + 190;

    // The y-axis coordinate of the end point
    const y = this.position.y + 110;

    const shapeEdge = {
      x: this.position.x,
      y: this.position.y,
    };
    const rotationAmount = (Math.PI / 180) * this.position.r;

    CTX.save();
    CTX.strokeStyle = "white";
    CTX.beginPath();
    CTX.moveTo(shapeEdge.x + this.size, shapeEdge.y + this.size / 2);

    // Tumble
    if (this.tumbling) {
      CTX.rotate((Math.PI / 180) * randomBetween(-4, 4));
    } else {
      CTX.rotate((Math.PI / 180) * this.position.r);
    }

    CTX.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);

    CTX.lineWidth = 10;
    CTX.lineCap = "round";
    CTX.stroke();
    CTX.restore();
  }

  draw(CTX) {
    this.drawMotor(CTX);
    this.drawFlagella(CTX);
  }
}
