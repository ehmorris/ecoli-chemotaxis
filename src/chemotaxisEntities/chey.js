import {
  randomBetween,
  isAtBoundary,
  nextPositionAlongHeading,
  generateID,
  randomBool
} from "../helpers.js";
import { cheYProperties } from "../data.js";

export class CheY {
  constructor() {
    this.id = generateID();
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
    this.size = cheYProperties.defaultSize;
    this.age = 0;
    this.stuckAt = 0;
    this.isStuck = false;
    this.stuckTo = null;
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
    this.color = "#cccccc";
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

    if (this.isStuck && this.stuckTo.type === "motor") {
      if (this.age > this.stuckAt + cheYProperties.motorStickDuration) {
        this.unstick();
      }
    } else if (this.isStuck && this.stuckTo.type === "receptor") {
      if (this.age > this.stuckAt + cheYProperties.receptorStickDuration) {
        this.unstick();
      }
    }

    const newPosition = nextPositionAlongHeading(
      this.position,
      this.speed,
      this.heading,
      cheYProperties.boundaryTop,
      cheYProperties.boundaryRight,
      cheYProperties.boundaryBottom,
      cheYProperties.boundaryLeft
    );

    this.position = newPosition;

    CTX.fillRect(newPosition.x, newPosition.y, this.size, this.size);
    this.age = this.age + 1;
  }
}
