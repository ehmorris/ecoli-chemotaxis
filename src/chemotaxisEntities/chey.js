import {
  randomBetween,
  randomBool,
  nextPositionAlongHeading,
  isShapeInPath,
} from "../helpers.js";
import { cheYProperties, ecoliProperties } from "../data.js";

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
      x: ecoliProperties.boundaryLeft + ecoliProperties.width / 2,
      y: ecoliProperties.boundaryTop + ecoliProperties.height / 2,
    })
    .set("type", "chey")
    .set("size", cheYProperties.defaultSize)
    .set("isStuck", false);

  const phosphorylate = () => {
    props.set("phosphorylated", true);
    color = cheYProperties.phosphorylatedColor;
    timePhosphorylated = Date.now();
    console.log("phosphorylate");
  };

  const dephosphorylate = () => {
    props.set("phosphorylated", false);
    color = cheYProperties.defaultColor;
    console.log("dephosphorylate");
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
      console.log("unstick");
    } else {
      color = cheYProperties.defaultColor;
    }

    props.set("isStuck", false);
    stuckTo = null;
    speed = randomBetween(cheYProperties.speedMin, cheYProperties.speedMax);
  };

  const draw = () => {
    getNewRandomLocationInBoundary(
      CTX,
      heading,
      speed,
      props.get("position"),
      props.get("size"),
      containerPath,
      ecoliProperties.boundaryLeft,
      ecoliProperties.boundaryTop
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
        console.log("phosphorylation timeout");
      }

      CTX.fillStyle = color;
      CTX.save();
      CTX.translate(shapeCenter.x, shapeCenter.y);
      CTX.rotate(rotationAmount);
      CTX.translate(-props.get("size") / 2, -props.get("size") / 2);
      CTX.fill(new Path2D(cheYProperties.shapePath));
      CTX.restore();

      if (props.get("isStuck") && stuckTo.props.get("type") === "motor") {
        if (age > stuckAt + cheYProperties.motorStickDuration) {
          unstick();
        }
      } else if (
        props.get("isStuck") &&
        stuckTo.props.get("type") === "receptor"
      ) {
        if (age > stuckAt + cheYProperties.receptorStickDuration) {
          unstick();
        }
      } else {
        // Only change these props when unstuck
        props.set("position", { x: nextPosition.x, y: nextPosition.y });
        heading = nextPosition.heading;
        rotation += 2;
      }

      age += 1;
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
  boundaryPathYOffset
) => {
  // Add jitter to movement
  const headingWithJitter = heading + randomBetween(-20, 20);

  // Test new location
  return new Promise((resolve) => {
    const prospectiveNewLocation = nextPositionAlongHeading(
      currentLocation,
      currentSpeed,
      headingWithJitter
    );

    if (
      !isShapeInPath(
        context,
        boundaryPath,
        boundaryPathXOffset,
        boundaryPathYOffset,
        prospectiveNewLocation,
        currentSize
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
          boundaryPathYOffset
        )
      );
    } else {
      return resolve(prospectiveNewLocation);
    }
  });
};
