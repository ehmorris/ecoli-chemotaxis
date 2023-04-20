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

  return context;
};

export const generateSlider = ({ value, max, min, attachNode, onInput }) => {
  const element = document.createElement("input");
  element.value = value;
  element.max = max;
  element.min = min;
  element.type = "range";
  element.classList.add("slider");

  const parent = document.createElement("div");
  parent.append(element);

  document.querySelector(attachNode).appendChild(parent);

  element.addEventListener("input", ({ target: { value } }) => onInput(value));

  return element;
};

export const generateArrayOfX = (num, fill) => {
  return new Array(num).fill().map(() => fill());
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
  size
) => {
  // isPointInPath is basing its result on a 2X size version of the input
  // path. Not sure how to fix this, so we pass in a 2X size coordinate
  const scaleFactor = window.devicePixelRatio;
  const scaledLocation = {
    x: (location.x - pathXOffset) * scaleFactor,
    y: (location.y - pathYOffset) * scaleFactor,
  };
  const scaledSize = size * scaleFactor;

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

export const getEntityIntersection = (entityArr1, entityArr2) =>
  entityArr1.filter((entity1) =>
    entityArr2.some((entity2) =>
      isColliding(
        entity2.props.get("position"),
        entity2.props.get("size"),
        entity1.props.get("position"),
        entity1.props.get("size")
      )
    )
  );

export const nextPositionAlongHeading = (position, speed, headingInDeg) => ({
  x: position.x + speed * Math.cos(headingInDeg * (Math.PI / 180)),
  y: position.y + speed * Math.sin(headingInDeg * (Math.PI / 180)),
  heading: headingInDeg,
});
