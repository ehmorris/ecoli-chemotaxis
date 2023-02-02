import {
  randomBetween,
  isAtBoundary,
  nextPositionAlongHeading,
  clampNumber,
} from "../helpers.js";
import {
  attractantProperties,
  ecoliProperties,
  canvasProperties,
} from "../data.js";

export const makeAttractant = (CTX, passedPosition) => {
  // internal props
  const containerPath = new Path2D(ecoliProperties.boundaryPath);
  let color = attractantProperties.defaultColor;
  let heading = randomBetween(0, 359);
  let speed = randomBetween(
    attractantProperties.speedMin,
    attractantProperties.speedMax
  );
  let age = 0;
  let stuckAt = 0;

  // exposed props
  const props = new Map()
    .set("size", attractantProperties.defaultSize)
    .set("type", "attractant")
    .set("isStuck", false)
    .set(
      "position",
      passedPosition
        ? passedPosition
        : {
            x: randomBetween(0, canvasProperties.width),
            y: randomBetween(0, canvasProperties.height),
          }
    );

  const stick = () => {
    props.set("isStuck", true);
    speed = 0;
    stuckAt = age;
  };

  const unstick = () => {
    props
      .set("position", {
        x: randomBetween(0, canvasProperties.width),
        y: randomBetween(0, canvasProperties.height),
      })
      .set("isStuck", false);
    speed = randomBetween(
      attractantProperties.speedMin,
      attractantProperties.speedMax
    );
  };

  const draw = () => {
    getNewPosition(
      CTX,
      heading,
      speed,
      props.get("position"),
      props.get("size")
    ).then((nextPosition) => {
      CTX.fillStyle = color;
      CTX.fillRect(
        props.get("position").x,
        props.get("position").y,
        props.get("size"),
        props.get("size")
      );

      if (
        props.get("isStuck") &&
        age > stuckAt + attractantProperties.stickDuration
      ) {
        unstick();
      } else {
        // only change these props when unstuck
        props.set("position", { x: nextPosition.x, y: nextPosition.y });
        heading = nextPosition.heading;
      }

      age += 1;
    });
  };

  return { stick, unstick, draw, props };
};

const getNewPosition = (
  context,
  currentHeading,
  currentSpeed,
  currentPosition
) => {
  const minClamp = randomBetween(-90, -70);
  const maxClamp = randomBetween(70, 90);
  const headingWithDirectionAndJitter = clampNumber(
    currentHeading + randomBetween(-90, 90),
    minClamp,
    maxClamp
  );

  return new Promise((resolve) => {
    const prospectiveNewPosition = nextPositionAlongHeading(
      currentPosition,
      currentSpeed,
      headingWithDirectionAndJitter
    );

    if (
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
        getNewPosition(
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
};
