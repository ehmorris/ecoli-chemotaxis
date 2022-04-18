import {
  randomBetween,
  isAtBoundary,
  clampNumber,
  degToRad
} from "../helpers.js";
import { attractantProperties } from "../data.js";

export class Attractant {
  constructor() {
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
  }

  stick() {
    // need some kind of constraint so attractant doesn't immediately re-stick
    this.speed = 0;
    this.stuckAt = this.age;
  }

  unstick() {
    this.speed = randomBetween(
      attractantProperties.speedMin,
      attractantProperties.speedMax
    );
  }

  draw(CTX) {
    CTX.fillStyle = this.color;

    if (
      isAtBoundary(
        this.position,
        this.size,
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

    if (this.age > this.stuckAt + attractantProperties.stickDuration) {
      this.unstick();
    }

    const newPosition = {
      x: clampNumber(
        this.position.x + this.speed * Math.cos(degToRad(this.heading)),
        attractantProperties.boundaryLeft,
        attractantProperties.boundaryRight
      ),
      y: clampNumber(
        this.position.y + this.speed * Math.sin(degToRad(this.heading)),
        attractantProperties.boundaryTop,
        attractantProperties.boundaryBottom
      )
    };

    this.position = newPosition;

    CTX.fillRect(this.position.x, this.position.y, this.size, this.size);
    this.age = this.age + 1;
  }
}
