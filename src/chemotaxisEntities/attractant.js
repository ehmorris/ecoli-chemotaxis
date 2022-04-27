import {
  randomBetween,
  isAtBoundary,
  nextPositionAlongHeading,
  generateID
} from "../helpers.js";
import { attractantProperties } from "../data.js";

export class Attractant {
  constructor() {
    this.id = generateID();
    this.position = {
      x: randomBetween(
        attractantProperties.boundaryLeft,
        attractantProperties.boundaryRight
      ),
      y: randomBetween(
        attractantProperties.boundaryTop,
        attractantProperties.boundaryBottom
      )
    };
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
    this.position = {
      x: randomBetween(
        attractantProperties.boundaryLeft,
        attractantProperties.boundaryRight
      ),
      y: randomBetween(
        attractantProperties.boundaryTop,
        attractantProperties.boundaryBottom
      )
    };
    this.speed = randomBetween(
      attractantProperties.speedMin,
      attractantProperties.speedMax
    );
    this.isStuck = false;
  }

  draw(CTX) {
    CTX.fillStyle = this.color;

    if (
      isAtBoundary(
        this.position,
        attractantProperties.boundaryTop,
        attractantProperties.boundaryRight,
        attractantProperties.boundaryBottom,
        attractantProperties.boundaryLeft
      )
    ) {
      // change heading at edge of container
      this.heading = ((this.heading + 90) % 360) + randomBetween(-20, 20);
    } else {
      // add a small amount of jitter
      this.heading =
        this.heading +
        randomBetween(
          -attractantProperties.movementJitter,
          attractantProperties.movementJitter
        );
    }

    if (
      this.isStuck &&
      this.age > this.stuckAt + attractantProperties.stickDuration
    ) {
      this.unstick();
    }

    const newPosition = nextPositionAlongHeading(
      this.position,
      this.speed,
      this.heading,
      attractantProperties.boundaryTop,
      attractantProperties.boundaryRight,
      attractantProperties.boundaryBottom,
      attractantProperties.boundaryLeft
    );

    this.position = newPosition;

    CTX.fillRect(this.position.x, this.position.y, this.size, this.size);
    this.age = this.age + 1;
  }
}
