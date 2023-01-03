import {
  randomBetween,
  isAtBoundary,
  nextPositionAlongHeading,
  isShapeInPath,
  clampNumber,
  generateID,
} from "../helpers.js";
import {
  attractantProperties,
  ecoliProperties,
  canvasProperties,
} from "../data.js";

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

  getNewPositionOutsideBoundary(
    context,
    currentHeading,
    currentSpeed,
    currentPosition
  ) {
    // add jitter to movement
    const minClamp = randomBetween(-90, -70);
    const maxClamp = randomBetween(70, 90);
    const headingWithDirectionAndJitter = clampNumber(
      currentHeading + randomBetween(-90, 90),
      minClamp,
      maxClamp
    );

    // test new position
    return new Promise((resolve) => {
      const prospectiveNewPosition = nextPositionAlongHeading(
        currentPosition,
        currentSpeed,
        headingWithDirectionAndJitter
      );

      if (
        isShapeInPath(
          context,
          this.containerPath,
          ecoliProperties.boundaryLeft,
          ecoliProperties.boundaryTop,
          prospectiveNewPosition,
          this.size
        ) ||
        isAtBoundary(
          prospectiveNewPosition,
          0,
          canvasProperties.width,
          canvasProperties.height,
          0
        )
      ) {
        const newPosition =
          prospectiveNewPosition.x >= canvasProperties.width
            ? { x: 0, y: prospectiveNewPosition.y }
            : currentPosition;

        return resolve(
          this.getNewPositionOutsideBoundary(
            context,
            headingWithDirectionAndJitter,
            currentSpeed,
            newPosition
          )
        );
      } else {
        return resolve(prospectiveNewPosition);
      }
    });
  }

  draw(CTX) {
    this.getNewPositionOutsideBoundary(
      CTX,
      this.heading,
      this.speed,
      this.position,
      this.size
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
