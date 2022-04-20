import {
  randomBetween,
  degToRad,
  isAtBoundary,
  clampNumber
} from "../helpers.js";
import { cheYProperties } from "../data.js";

export class CheY {
  constructor() {
    this.position = {
      x: randomBetween(
        cheYProperties.boundaryLeft,
        cheYProperties.boundaryRight
      ),
      y: randomBetween(
        cheYProperties.boundaryTop,
        cheYProperties.boundaryBottom
      )
    };
    this.heading = randomBetween(0, 359);
    this.type = "chey";
    this.color = cheYProperties.defaultColor;
    this.phosphorylated = false;
    this.size = cheYProperties.defaultSize;
    this.age = 0;
    this.stuckAt = 0;
    this.isStuck = false;
    this.speed = randomBetween(
      cheYProperties.speedMin,
      cheYProperties.speedMax
    );
  }

  phosphorylate() {
    this.phosphorylated = true;
    this.color = cheYProperties.phosphorylatedColor;
  }

  dephosphorylate() {
    this.phosphorylated = false;
    this.color = cheYProperties.defaultColor;
  }

  stick() {
    this.speed = 0;
    this.color = "#cccccc";
    this.stuckAt = this.age;
    this.isStuck = true;
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
  }

  draw(CTX) {
    CTX.fillStyle = this.color;

    if (
      isAtBoundary(
        this.position,
        cheYProperties.boundaryTop,
        cheYProperties.boundaryRight,
        cheYProperties.boundaryBottom,
        cheYProperties.boundaryLeft
      )
    ) {
      // change heading at edge of container
      this.heading = ((this.heading + 90) % 360) + randomBetween(-20, 20);
    } else {
      // add a small amount of jitter
      this.heading =
        this.heading +
        randomBetween(
          -cheYProperties.movementJitter,
          cheYProperties.movementJitter
        );
    }

    if (
      this.isStuck &&
      this.age > this.stuckAt + cheYProperties.stickDuration
    ) {
      this.unstick();
    }

    const newPosition = {
      x: clampNumber(
        this.position.x + this.speed * Math.cos(degToRad(this.heading)),
        cheYProperties.boundaryLeft,
        cheYProperties.boundaryRight
      ),
      y: clampNumber(
        this.position.y + this.speed * Math.sin(degToRad(this.heading)),
        cheYProperties.boundaryTop,
        cheYProperties.boundaryBottom
      )
    };

    this.position = newPosition;

    CTX.fillRect(newPosition.x, newPosition.y, this.size, this.size);
    this.age = this.age + 1;
  }
}
