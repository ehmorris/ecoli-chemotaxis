import {
  randomBetween,
  degToRad,
  isAtBoundary,
  clampNumber
} from "../helpers.js";
import { cheYProperties, canvasProperties } from "../data.js";

export class CheY {
  constructor() {
    this.position = {
      x: randomBetween(0, canvasProperties.width - cheYProperties.defaultSize),
      y: randomBetween(0, canvasProperties.height - cheYProperties.defaultSize)
    };
    this.heading = randomBetween(0, 359);
    this.type = "chey";
    this.color = cheYProperties.defaultColor;
    this.phosphorylated = false;
    this.size = cheYProperties.defaultSize;
    this.speed = randomBetween(
      cheYProperties.speedMin,
      cheYProperties.speedMax
    );
  }

  changeHeading(heading, jitterAmount = 0) {
    this.heading = heading + randomBetween(-jitterAmount, jitterAmount);
  }

  makePhosphorylated() {
    this.phosphorylated = true;
    this.color = cheYProperties.phosphorylatedColor;
    this.size = cheYProperties.phosphorylatedSize;
  }

  draw(CTX) {
    CTX.fillStyle = this.color;

    if (
      isAtBoundary(
        this.position,
        this.size,
        canvasProperties.width,
        canvasProperties.height
      )
    ) {
      // change heading at edge of container
      this.changeHeading((this.heading + 90) % 360, 30);
    } else {
      // add a small amount of jitter
      this.changeHeading(this.heading, cheYProperties.movementJitter);
    }

    const newPosition = {
      x: clampNumber(
        this.position.x + this.speed * Math.cos(degToRad(this.heading)),
        0,
        canvasProperties.width
      ),
      y: clampNumber(
        this.position.y + this.speed * Math.sin(degToRad(this.heading)),
        0,
        canvasProperties.height
      )
    };

    this.position = newPosition;

    CTX.fillRect(newPosition.x, newPosition.y, this.size, this.size);
  }
}
