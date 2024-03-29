import {
  randomBetween,
  nextPositionAlongHeading,
  isShapeInPath,
} from "../helpers.js";
import { canvasProperties, cheYProperties, ecoliProperties } from "../data.js";

export const makeCheY = (CTX) => {
  // Internal props
  const containerPath = new Path2D(ecoliProperties.boundaryPath);
  let heading = randomBetween(0, 359);
  let color = cheYProperties.defaultColor;
  let age = 0;
  let stuckAt = 0;
  let stuckTo = null;
  let rotation = 0;
  let speed = randomBetween(cheYProperties.speedMin, cheYProperties.speedMax);
  let timePhosphorylated = null;

  // Exposed props
  const props = new Map()
    .set("position", {
      x:
        ecoliProperties.boundaryLeft * canvasProperties.illustrationScale +
        (ecoliProperties.width / 2) * canvasProperties.illustrationScale,
      y:
        ecoliProperties.boundaryTop * canvasProperties.illustrationScale +
        (ecoliProperties.height / 2) * canvasProperties.illustrationScale,
    })
    .set("type", "chey")
    .set("size", cheYProperties.defaultSize)
    .set("isStuck", false);

  const phosphorylate = () => {
    props.set("phosphorylated", true);
    color = cheYProperties.phosphorylatedColor;
    timePhosphorylated = Date.now();
  };

  const dephosphorylate = () => {
    props.set("phosphorylated", false);
    color = cheYProperties.defaultColor;
  };

  const stick = (newStuckTo) => {
    props.set("isStuck", true);
    stuckTo = newStuckTo;
    speed = 0;
    stuckAt = age;
    color = cheYProperties.stuckColor;
  };

  const unstick = () => {
    if (props.get("phosphorylated")) {
      color = cheYProperties.phosphorylatedColor;
    } else {
      color = cheYProperties.defaultColor;
    }

    props.set("isStuck", false);
    stuckTo = null;
    speed = randomBetween(cheYProperties.speedMin, cheYProperties.speedMax);
  };

  const draw = (deltaTime) => {
    const deltaTimeMultiplier = deltaTime / canvasProperties.interval;

    getNewRandomLocationInBoundary(
      CTX,
      heading,
      speed,
      props.get("position"),
      props.get("size"),
      containerPath,
      ecoliProperties.boundaryLeft,
      ecoliProperties.boundaryTop,
      deltaTimeMultiplier
    ).then((nextPosition) => {
      const shapeCenter = {
        x: nextPosition.x + props.get("size") / 2,
        y: nextPosition.y + props.get("size") / 2,
      };
      const rotationAmount = (Math.PI / 180) * rotation;

      if (
        props.get("phosphorylated") &&
        !props.get("isStuck") &&
        timePhosphorylated &&
        Date.now() - timePhosphorylated >
          cheYProperties.maxPhosphorylatedDuration
      ) {
        dephosphorylate();
      }

      CTX.fillStyle = color;
      CTX.save();
      CTX.translate(shapeCenter.x, shapeCenter.y);
      CTX.rotate(rotationAmount);
      CTX.translate(-props.get("size") / 2, -props.get("size") / 2);
      CTX.scale(
        canvasProperties.illustrationScale,
        canvasProperties.illustrationScale
      );
      CTX.fill(new Path2D(cheYProperties.shapePath));
      CTX.restore();

      if (props.get("isStuck") && stuckTo.props.get("type") === "motor") {
        if (age > stuckAt + cheYProperties.motorStickDuration * canvasProperties.illustrationScale) {
          unstick();
        }
      } else if (
        props.get("isStuck") &&
        stuckTo.props.get("type") === "receptor"
      ) {
        if (age > stuckAt + cheYProperties.receptorStickDuration * canvasProperties.illustrationScale) {
          unstick();
        }
      } else {
        // Only change these props when unstuck
        props.set("position", { x: nextPosition.x, y: nextPosition.y });
        heading = nextPosition.heading;
        rotation += deltaTimeMultiplier * 2;
      }

      age += deltaTimeMultiplier * 1;
    });
  };

  return { phosphorylate, dephosphorylate, stick, unstick, draw, props };
};

// Recurse until new location inside boundary is found
const getNewRandomLocationInBoundary = (
  context,
  heading,
  currentSpeed,
  currentLocation,
  currentSize,
  boundaryPath,
  boundaryPathXOffset,
  boundaryPathYOffset,
  deltaTimeMultiplier
) => {
  // Add jitter to movement
  const headingWithJitter = heading + randomBetween(-20, 20);

  // Test new location
  return new Promise((resolve) => {
    const prospectiveNewLocation = nextPositionAlongHeading(
      currentLocation,
      currentSpeed,
      headingWithJitter,
      deltaTimeMultiplier
    );

    if (
      !isShapeInPath(
        context,
        boundaryPath,
        boundaryPathXOffset,
        boundaryPathYOffset,
        prospectiveNewLocation,
        currentSize,
        canvasProperties.illustrationScale
      )
    ) {
      const newHeading = randomBetween(1, 360);
      return resolve(
        getNewRandomLocationInBoundary(
          context,
          newHeading,
          currentSpeed,
          currentLocation,
          currentSize,
          boundaryPath,
          boundaryPathXOffset,
          boundaryPathYOffset,
          deltaTimeMultiplier
        )
      );
    } else {
      return resolve(prospectiveNewLocation);
    }
  });
};
