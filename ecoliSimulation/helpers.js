export const randomBetween = (min, max) => Math.random() * (max - min) + min;

export const randomBool = (probability = 0.5) => Math.random() >= probability;

export const clampNumber = (number, min, max) =>
  Math.max(min, Math.min(number, max));

export const generateCanvas = ({ width, height, attachNode }) => {
  const element = document.createElement("canvas");
  const context = element.getContext("2d");

  element.style.width = width + "px";
  element.style.height = height + "px";

  const scale = window.devicePixelRatio;
  element.width = Math.floor(width * scale);
  element.height = Math.floor(height * scale);
  context.scale(scale, scale);

  document.querySelector(attachNode).appendChild(element);

  return [context, element];
};

export const generateArrayOfX = (num, fill) => {
  return new Array(Math.round(num)).fill().map(() => fill());
};

export const isAtBoundary = (
  point,
  boundaryTop,
  boundaryRight,
  boundaryBottom,
  boundaryLeft
) => {
  return (
    point.x >= boundaryRight ||
    point.x <= boundaryLeft ||
    point.y >= boundaryBottom ||
    point.y <= boundaryTop
  );
};

// Test all corners of a square against a boundary
export const isShapeInPath = (
  context,
  path,
  pathXOffset,
  pathYOffset,
  location,
  size,
  extraScaleFactor
) => {
  // isPointInPath is basing its result on a 2X size version of the input
  // path. Not sure how to fix this, so we pass in a 2X size coordinate
  const scaleFactor = window.devicePixelRatio;
  const scaledLocation = {
    x: (location.x - pathXOffset * extraScaleFactor) * scaleFactor,
    y: (location.y - pathYOffset * extraScaleFactor) * scaleFactor,
  };
  const scaledSize = size * extraScaleFactor * scaleFactor;

  return (
    context.isPointInPath(path, scaledLocation.x, scaledLocation.y) &&
    context.isPointInPath(
      path,
      scaledLocation.x + scaledSize,
      scaledLocation.y
    ) &&
    context.isPointInPath(
      path,
      scaledLocation.x + scaledSize,
      scaledLocation.y + scaledSize
    ) &&
    context.isPointInPath(path, scaledLocation.x, scaledLocation.y + scaledSize)
  );
};

// https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
export const isColliding = (pos1, size1, pos2, size2) => {
  return (
    pos1.x < pos2.x + size2 &&
    pos1.x + size1 > pos2.x &&
    pos1.y < pos2.y + size2 &&
    size1 + pos1.y > pos2.y
  );
};

export const getEntityIntersection = (entityArr1, entityArr2, scale) =>
  entityArr1.filter((entity1) =>
    entityArr2.some((entity2) =>
      isColliding(
        {
          x: entity2.props.get("position").x * scale,
          y: entity2.props.get("position").y * scale,
        },
        entity2.props.get("size") * scale,
        {
          x: entity1.props.get("position").x,
          y: entity1.props.get("position").y,
        },
        entity1.props.get("size") * scale
      )
    )
  );

export const nextPositionAlongHeading = (
  position,
  speed,
  headingInDeg,
  deltaTimeMultiplier = 1
) => ({
  x:
    position.x +
    deltaTimeMultiplier * (speed * Math.cos(headingInDeg * (Math.PI / 180))),
  y:
    position.y +
    deltaTimeMultiplier * (speed * Math.sin(headingInDeg * (Math.PI / 180))),
  heading: headingInDeg,
});
