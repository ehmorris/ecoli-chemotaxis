export const randomBetween = (min, max) => Math.random() * (max - min) + min;

export const randomBool = (probability = 0.5) => Math.random() >= probability;

export const randomFromArray = (array) =>
  array[Math.floor(Math.random() * array.length)];

export const degToRad = (deg) => deg * (Math.PI / 180);

export const clampNumber = (number, min, max) =>
  Math.max(min, Math.min(number, max));

export const generateID = () => Math.random().toString(16).slice(2);

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

export const generateSlider = ({ label, value, max, min, attachNode }) => {
  const element = document.createElement("input");
  element.value = value;
  element.max = max;
  element.min = min;
  element.type = "range";
  element.classList.add("input");

  const elementLabel = document.createElement("label");
  elementLabel.classList.add("label");
  elementLabel.append(label);

  const parent = document.createElement("div");
  parent.classList.add("slider");
  parent.append(elementLabel, element);

  document.querySelector(attachNode).appendChild(parent);

  return element;
};

export const generateArrayOfObjects = (num, object) => {
  return new Array(num).fill().map((_) => new object());
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
        entity2.position,
        entity2.size,
        entity1.position,
        entity1.size
      )
    )
  );

export const nextPositionAlongHeading = (
  position,
  speed,
  headingInDeg,
  boundaryTop,
  boundaryRight,
  boundaryBottom,
  boundaryLeft
) => ({
  x: clampNumber(
    position.x + speed * Math.cos(degToRad(headingInDeg)),
    boundaryLeft,
    boundaryRight
  ),
  y: clampNumber(
    position.y + speed * Math.sin(degToRad(headingInDeg)),
    boundaryTop,
    boundaryBottom
  )
});
