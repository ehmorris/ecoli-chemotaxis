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
const height = width * 0.5625;
const [CTX, canvasEl] = generateCanvas({
  width,
  height,
  attachNode: "#tumbleRunCanvasContainer",
});
canvasEl.style.clipPath = `path('${make24pxCornerRadiusSquirclePath(
  width,
  height
)}')`;

const runColor = "#0E4782";
const tumbleColor = "#C2D6FF";
const eatingColor = "#C2D6FF";
let eColiPosition = { x: 50, y: 50 };
let eColiHeading = randomBetween(0, 359);
let speed = 2;
let rotation = 0;
let size = 7;
let isRunning = true;
let timeSinceLastRunBegan = 0;
let timeSinceLastTumbleBegan = 0;
let stateHistory = new Array(1000).fill("none");

const attractant = [
  { x: width / 8, y: height / 6, size: width / 3 },
  { x: width - width / 3, y: height - height / 2, size: width / 8 },
];

const drawAttractant = () => {
  attractant.forEach(({ x, y, size }) => {
    CTX.save();
    CTX.translate(x, y);
    CTX.fillStyle = "gray";
    CTX.beginPath();
    CTX.arc(size / 2, size / 2, size / 1.8, 0, 2 * Math.PI);
    CTX.closePath();
    CTX.fill();
    CTX.restore();
  });
};

const drawEcoli = (isOnAttractant) => {
  const shapeCenter = {
    x: eColiPosition.x + size / 2,
    y: eColiPosition.y + size / 2,
  };
  const rotationAmount = (Math.PI / 180) * rotation;

  CTX.save();
  CTX.translate(shapeCenter.x, shapeCenter.y);
  CTX.rotate(rotationAmount);
  CTX.translate(-size / 2, -size / 2);
  CTX.fillStyle = isOnAttractant
    ? eatingColor
    : isRunning
    ? runColor
    : tumbleColor;
  CTX.beginPath();
  CTX.arc(size / 2, size / 2, size, 0, 2 * Math.PI);
  CTX.closePath();
  CTX.fill();
  CTX.restore();
};

const drawStateHistory = () => {
  const padding = 12;
  const entryWidth = (width - padding * 2) / stateHistory.length;
  const entryHeight = 12;

  CTX.save();
  stateHistory.forEach((entry, index) => {
    if (entry === "none") {
      CTX.fillStyle = "transparent";
    } else if (entry === "eating") {
      CTX.fillStyle = eatingColor;
    } else if (entry === "run") {
      CTX.fillStyle = runColor;
    } else if (entry === "tumble") {
      CTX.fillStyle = tumbleColor;
    }

    CTX.fillRect(
      padding + index * entryWidth,
      height - padding - entryHeight,
      entryWidth * 2,
      entryHeight
    );
  });
  CTX.restore();
};

animate((getTimeElapsed) => {
  CTX.fillStyle = "#000117";
  CTX.fillRect(0, 0, width, height);

  drawAttractant();

  const wasOnAttractantLastPosition = attractant.some((a) =>
    isColliding(eColiPosition, size, { x: a.x, y: a.y }, a.size)
  );

  eColiPosition = getNewLocation(eColiHeading, speed, eColiPosition, size);

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

  stateHistory.push(isOnAttractant ? "eating" : isRunning ? "run" : "tumble");
  stateHistory.shift();

  drawStateHistory();

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
  }

  return prospectiveNewLocation;
};
