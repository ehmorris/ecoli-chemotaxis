import {
  generateCanvas,
  randomBetween,
  nextPositionAlongHeading,
  isAtBoundary,
  isColliding,
} from "../ecoliSimulation/helpers.js";
import { animate } from "../ecoliSimulation/animation.js";
import { make24pxCornerRadiusSquirclePath } from "../makeSquircle.js";

const width = document.querySelector("article").clientWidth;
const height = width;
const [CTX, canvasEl] = generateCanvas({
  width,
  height,
  attachNode: "#tumbleRunCanvasContainer",
});
canvasEl.style.clipPath = `path('${make24pxCornerRadiusSquirclePath(
  width,
  height
)}')`;

const runColor = "#C2D6FF";
const tumbleColor = "#C2D6FF";
const eatingColor = "#C2D6FF";
let eColiPosition = { x: 50, y: 50 };
let eColiHeading = randomBetween(0, 359);
let speed = 2;
let size = 7;
let isRunning = true;
let timeSinceLastRunBegan = 0;
let timeSinceLastTumbleBegan = 0;
let positionHistory = [];

const attractant = [
  { x: width / 10, y: height / 10, size: width / 2.5 },
  { x: width - width / 3, y: height - height / 3, size: width / 5.5 },
];

const drawAttractant = () => {
  attractant.forEach(({ x, y, size }) => {
    CTX.save();
    CTX.translate(x, y);
    for (let index = 1; index < 6; index++) {
      CTX.strokeStyle = `rgba(255, 255, 255, ${index * 0.2})`;
      CTX.beginPath();
      CTX.arc(size / 2, size / 2, size / (index * 1.8), 0, 2 * Math.PI);
      CTX.closePath();
      CTX.stroke();
    }
    CTX.restore();
  });
};

const drawEcoli = (isOnAttractant) => {
  CTX.save();
  CTX.translate(eColiPosition.x, eColiPosition.y);
  CTX.fillStyle = isOnAttractant
    ? eatingColor
    : isRunning
    ? runColor
    : tumbleColor;
  CTX.beginPath();
  CTX.arc(0, 0, size, 0, 2 * Math.PI);
  CTX.closePath();
  CTX.fill();
  CTX.restore();
};

const drawPositionHistory = () => {
  CTX.save();
  CTX.globalAlpha = 0.5;
  CTX.strokeStyle = runColor;
  CTX.beginPath();
  positionHistory.forEach(({ x, y }, index) => {
    if (index > 0) {
      CTX.lineTo(x, y);
    } else {
      CTX.moveTo(x, y);
    }
  });
  CTX.stroke();
  CTX.restore();
};

animate((getTimeElapsed) => {
  CTX.fillStyle = "#000117";
  CTX.fillRect(0, 0, width, height);
  let positionWasReset = false;

  drawAttractant();

  const wasOnAttractantLastPosition = attractant.some((a) =>
    isColliding(eColiPosition, size, { x: a.x, y: a.y }, a.size)
  );

  [eColiPosition, positionWasReset] = getNewLocation(
    eColiHeading,
    speed,
    eColiPosition,
    size
  );

  const isOnAttractant = attractant.some((a) =>
    isColliding(eColiPosition, size, { x: a.x, y: a.y }, a.size)
  );

  if (isRunning) {
    eColiHeading += randomBetween(-2, 2);

    if (
      (getTimeElapsed() - timeSinceLastRunBegan > 4_000 ||
        wasOnAttractantLastPosition) &&
      !isOnAttractant
    ) {
      isRunning = false;
      speed = 3;
      timeSinceLastTumbleBegan = getTimeElapsed();
    }
  } else {
    eColiHeading += randomBetween(-40, 40);

    if (getTimeElapsed() - timeSinceLastTumbleBegan > 800 || isOnAttractant) {
      isRunning = true;
      speed = 2;
      timeSinceLastRunBegan = getTimeElapsed();
    }
  }

  if (positionWasReset) {
    positionHistory = [];
  }
  positionHistory.push(eColiPosition);
  drawPositionHistory();

  drawEcoli(isOnAttractant);
});

const getNewLocation = (
  heading,
  currentSpeed,
  currentLocation,
  currentSize
) => {
  let prospectiveNewLocation = nextPositionAlongHeading(
    currentLocation,
    currentSpeed,
    heading
  );

  let _positionWasReset = false;

  if (
    isAtBoundary(
      prospectiveNewLocation,
      0,
      width - currentSize,
      height - currentSize,
      0
    )
  ) {
    prospectiveNewLocation = {
      x:
        prospectiveNewLocation.x > width
          ? 0
          : prospectiveNewLocation.x < 0
          ? width - currentSize
          : prospectiveNewLocation.x,
      y:
        prospectiveNewLocation.y > height
          ? 0
          : prospectiveNewLocation.y < 0
          ? height - currentSize
          : prospectiveNewLocation.y,
    };
    _positionWasReset = true;
  }

  return [prospectiveNewLocation, _positionWasReset];
};
