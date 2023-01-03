import {
  randomBetween,
  generateID,
  randomBool,
  getNewRandomLocationInBoundary,
} from "../helpers.js";
import { cheYProperties, ecoliProperties } from "../data.js";

export class CheY {
  constructor() {
    this.id = generateID();
    this.containerPath = new Path2D(ecoliProperties.boundaryPath);
    this.position = {
      x: ecoliProperties.boundaryLeft + ecoliProperties.width / 2,
      y: ecoliProperties.boundaryTop + ecoliProperties.height / 2,
    };
    this.heading = randomBetween(0, 359);
    this.type = "chey";
    this.color = cheYProperties.defaultColor;
    this.size = cheYProperties.defaultSize;
    this.age = 0;
    this.stuckAt = 0;
    this.isStuck = false;
    this.stuckTo = null;
    this.rotation = 0;
    this.speed = randomBetween(
      cheYProperties.speedMin,
      cheYProperties.speedMax
    );

    randomBool(0.75) ? this.phosphorylate() : this.dephosphorylate();
  }

  phosphorylate() {
    this.phosphorylated = true;
    this.color = cheYProperties.phosphorylatedColor;
  }

  dephosphorylate() {
    this.phosphorylated = false;
    this.color = cheYProperties.defaultColor;
  }

  stick(stuckTo) {
    this.speed = 0;
    this.color = cheYProperties.stuckColor;
    this.stuckAt = this.age;
    this.isStuck = true;
    this.stuckTo = stuckTo;
  }

  unstick() {
    if (this.phosphorylated) {
      this.color = cheYProperties.phosphorylatedColor;
    } else {
      this.color = cheYProperties.defaultColor;
    }

    this.speed = randomBetween(
      cheYProperties.speedMin,
      cheYProperties.speedMax
    );

    this.isStuck = false;
    this.stuckTo = null;
  }

  draw(CTX) {
    getNewRandomLocationInBoundary(
      CTX,
      this.heading,
      this.speed,
      this.position,
      this.size,
      this.containerPath,
      ecoliProperties.boundaryLeft,
      ecoliProperties.boundaryTop
    ).then(({ x, y, heading }) => {
      // fill in dot shape
      const shapeCenter = {
        x: x + this.size / 2,
        y: y + this.size / 2,
      };
      const rotationAmount = (Math.PI / 180) * this.rotation;

      // draw dot shape
      CTX.fillStyle = this.color;
      CTX.save();
      CTX.translate(shapeCenter.x, shapeCenter.y);
      CTX.rotate(rotationAmount);
      CTX.translate(-this.size / 2, -this.size / 2);
      CTX.fill(new Path2D(cheYProperties.shapePath));
      CTX.restore();

      if (this.isStuck && this.stuckTo.type === "motor") {
        if (this.age > this.stuckAt + cheYProperties.motorStickDuration) {
          this.unstick();
        }
      } else if (this.isStuck && this.stuckTo.type === "receptor") {
        if (this.age > this.stuckAt + cheYProperties.receptorStickDuration) {
          this.unstick();
        }
      } else {
        // only change these props when unstuck
        this.rotation = this.rotation + 2;
        this.position = { x, y };
        this.heading = heading;
      }

      this.age = this.age + 1;
    });
  }
}
