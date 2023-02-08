import {
  randomBetween,
  randomBool,
  nextPositionAlongHeading,
  isShapeInPath,
} from "../helpers.js";
import { cheYProperties, ecoliProperties } from "../data.js";

export const makeCheY = (CTX) => {
  const _containerPath = new Path2D(ecoliProperties.boundaryPath);
  let _heading = randomBetween(0, 359);
  let _color = cheYProperties.defaultColor;
  let _age = 0;
  let _stuckAt = 0;
  let _stuckTo = null;
  let _rotation = 0;
  let _speed = randomBetween(cheYProperties.speedMin, cheYProperties.speedMax);

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
    _color = cheYProperties.phosphorylatedColor;
  };

  const dephosphorylate = () => {
    props.set("phosphorylated", false);
    _color = cheYProperties.defaultColor;
  };

  const stick = (newStuckTo) => {
    props.set("isStuck", true);
    _stuckTo = newStuckTo;
    _speed = 0;
    _stuckAt = _age;
    _color = cheYProperties.stuckColor;
  };

  const unstick = () => {
    if (props.get("phosphorylated")) {
      _color = cheYProperties.phosphorylatedColor;
    } else {
      _color = cheYProperties.defaultColor;
    }

    props.set("isStuck", false);
    _stuckTo = null;
    _speed = randomBetween(cheYProperties.speedMin, cheYProperties.speedMax);
  };

  const draw = () => {
    getNewRandomLocationInBoundary(
      CTX,
      _heading,
      _speed,
      props.get("position"),
      props.get("size"),
      _containerPath,
      ecoliProperties.boundaryLeft,
      ecoliProperties.boundaryTop
    ).then((nextPosition) => {
      const shapeCenter = {
        x: nextPosition.x + props.get("size") / 2,
        y: nextPosition.y + props.get("size") / 2,
      };
      const rotationAmount = (Math.PI / 180) * _rotation;

      CTX.fillStyle = _color;
      CTX.save();
      CTX.translate(shapeCenter.x, shapeCenter.y);
      CTX.rotate(rotationAmount);
      CTX.translate(-props.get("size") / 2, -props.get("size") / 2);
      CTX.fill(new Path2D(cheYProperties.shapePath));
      CTX.restore();

      if (props.get("isStuck")) {
        if (
          (_stuckTo.props.get("type") === "motor" &&
            _age > _stuckAt + cheYProperties.motorStickDuration) ||
          (_stuckTo.props.get("type") === "receptor" &&
            _age > _stuckAt + cheYProperties.receptorStickDuration)
        ) {
          unstick();
        }
      } else {
        // Only change these props when unstuck
        props.set("position", { x: nextPosition.x, y: nextPosition.y });
        _heading = nextPosition.heading;
        _rotation += 2;
      }

      _age += 1;
    });
  };

  // Init with random phosphorylation
  randomBool(0.75) ? phosphorylate() : dephosphorylate();

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
