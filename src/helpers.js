export const randomBetween = (min, max) => Math.random() * (max - min) + min;

export const randomFromArray = (array) =>
  array[Math.floor(Math.random() * array.length)];

export const degToRad = (deg) => deg * (Math.PI / 180);

export const clampNumber = (number, min, max) =>
  Math.max(min, Math.min(number, max));

export const generateCanvas = (width, height) => {
  const element = document.createElement("canvas");
  const context = element.getContext("2d");

  element.style.width = width + "px";
  element.style.height = height + "px";

  const scale = window.devicePixelRatio;
  element.width = Math.floor(width * scale);
  element.height = Math.floor(height * scale);
  context.scale(scale, scale);

  document.body.appendChild(element);

  return context;
};

export const generateSlider = (label, value, max, min = 1) => {
  const element = document.createElement("input");
  element.value = value;
  element.max = max;
  element.min = min;
  element.type = "range";

  const elementLabel = document.createElement("label");
  elementLabel.value = label;

  const parent = document.createElement("div");
  parent.append(element, label);

  document.body.appendChild(parent);

  return element;
};

// export const isAtBoundary = (
//   point,
//   size,
//   boundaryTop,
//   boundaryRight,
//   boundaryBottom,
//   boundaryLeft
// ) => {
//   return (
//     point.x + size >= boundaryRight ||
//     point.x <= boundaryLeft ||
//     point.y + size >= boundaryBottom ||
//     point.y <= boundaryTop
//   );
// };

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
