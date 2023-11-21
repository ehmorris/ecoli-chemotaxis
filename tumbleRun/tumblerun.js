import {
  generateCanvas,
  randomBetween,
  nextPositionAlongHeading,
  isAtBoundary,
  isColliding,
} from "../ecoliSimulation/helpers.js";
import { animate } from "../ecoliSimulation/animation.js";
import { make24pxCornerRadiusSquirclePath } from "../makeSquircle.js";

const width = document.querySelector("#tumbleRunCanvasContainer").clientWidth;
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
const backgroundColor = "#000117";
let eColiHeading = randomBetween(0, 359);
let speed = 2;
let size = 14;
let eColiPosition = {
  x: randomBetween(0, width - size),
  y: randomBetween(0, height - size),
};
let isRunning = true;
let timeSinceLastRunBegan = 0;
let timeSinceLastTumbleBegan = 0;
let currentPositionHistory = [];
let pastPositions = new Array(6).fill([]);

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
  CTX.fillStyle = backgroundColor;
  CTX.strokeStyle = isOnAttractant
    ? eatingColor
    : isRunning
    ? runColor
    : tumbleColor;

  CTX.rotate((eColiHeading + 90) * (Math.PI / 180));
  CTX.beginPath();
  CTX.moveTo(0, -size / 2);
  CTX.lineTo(size / 2, size / 2);
  CTX.lineTo(-size / 2, size / 2);
  CTX.closePath();
  CTX.fill();
  CTX.stroke();
  CTX.restore();
};

const drawPositionHistory = () => {
  pastPositions.forEach((positionHistory, index) => {
    CTX.save();
    CTX.globalAlpha = index * 0.1;
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
  });

  CTX.save();
  CTX.globalAlpha = 0.5;
  CTX.strokeStyle = runColor;
  CTX.beginPath();
  currentPositionHistory.forEach(({ x, y }, index) => {
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
  CTX.fillStyle = backgroundColor;
  CTX.fillRect(0, 0, width, height);
  let positionWasReset = false;

  drawAttractant();

  const wasOnAttractantLastPosition = attractant.some((a) =>
    isColliding(eColiPosition, size, { x: a.x, y: a.y }, a.size)
  );

  [eColiPosition, positionWasReset] = getNewLocation(
    eColiHeading,
    speed,
    eColiPosition
  );

  const isOnAttractant = attractant.some((a) =>
    isColliding(eColiPosition, size, { x: a.x, y: a.y }, a.size)
  );

  if (isRunning) {
    eColiHeading += randomBetween(-10, 10);

    if (
      (getTimeElapsed() - timeSinceLastRunBegan > 4_000 ||
        wasOnAttractantLastPosition) &&
      !isOnAttractant
    ) {
      isRunning = false;
      timeSinceLastTumbleBegan = getTimeElapsed();
    }
  } else {
    eColiHeading += randomBetween(-180, 180);

    if (getTimeElapsed() - timeSinceLastTumbleBegan > 800 || isOnAttractant) {
      isRunning = true;
      timeSinceLastRunBegan = getTimeElapsed();
    }
  }

  if (positionWasReset) {
    if (currentPositionHistory.length > 20) {
      pastPositions.push(currentPositionHistory);
      pastPositions.shift();
    }
    currentPositionHistory = [];
  }
  currentPositionHistory.push(eColiPosition);
  drawPositionHistory();

  drawEcoli(isOnAttractant);
});

const getNewLocation = (heading, currentSpeed, currentLocation) => {
  let prospectiveNewLocation = nextPositionAlongHeading(
    currentLocation,
    currentSpeed,
    heading
  );

  let _positionWasReset = false;

  if (isAtBoundary(prospectiveNewLocation, 0, width, height, 0)) {
    prospectiveNewLocation = {
      x:
        prospectiveNewLocation.x > width
          ? 0
          : prospectiveNewLocation.x < 0
          ? width
          : prospectiveNewLocation.x,
      y:
        prospectiveNewLocation.y > height
          ? 0
          : prospectiveNewLocation.y < 0
          ? height
          : prospectiveNewLocation.y,
    };
    _positionWasReset = true;
  }

  return [prospectiveNewLocation, _positionWasReset];
};
