import {
  randomBetween,
  isAtBoundary,
  nextPositionAlongHeading,
  getNewAttractantLocationOutsideBoundary,
  generateID,
} from "../helpers.js";
import { attractantProperties, ecoliProperties } from "../data.js";

export class Attractant {
  constructor(passedPosition) {
    if (passedPosition) {
      this.position = passedPosition;
    } else {
      this.position = attractantProperties.defaultPosition;
    }

    this.id = generateID();
    this.containerPath = new Path2D(ecoliProperties.boundaryPath);
    this.type = "attractant";
    this.color = attractantProperties.defaultColor;
    this.size = attractantProperties.defaultSize;
    this.heading = randomBetween(0, 359);
    this.speed = randomBetween(
      attractantProperties.speedMin,
      attractantProperties.speedMax
    );
    this.age = 0;
    this.stuckAt = 0;
    this.isStuck = false;
  }

  stick() {
    // need some kind of constraint so attractant doesn't immediately re-stick
    this.speed = 0;
    this.stuckAt = this.age;
    this.isStuck = true;
  }

  unstick() {
    this.position = attractantProperties.defaultPosition;
    this.speed = randomBetween(
      attractantProperties.speedMin,
      attractantProperties.speedMax
    );
    this.isStuck = false;
  }

  draw(CTX) {
    getNewAttractantLocationOutsideBoundary(
      CTX,
      this.heading,
      this.speed,
      this.position,
      this.size,
      this.containerPath,
      ecoliProperties.boundaryLeft,
      ecoliProperties.boundaryTop
    ).then(({ x, y, heading }) => {
      CTX.fillStyle = this.color;
      CTX.fillRect(this.position.x, this.position.y, this.size, this.size);

      if (
        this.isStuck &&
        this.age > this.stuckAt + attractantProperties.stickDuration
      ) {
        this.unstick();
      } else {
        // only change these props when unstuck
        this.position = { x, y };
        this.heading = heading;
      }

      this.age = this.age + 1;
    });
  }
}
