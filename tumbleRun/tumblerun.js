import {
  generateCanvas,
  randomBetween,
  nextPositionAlongHeading,
  isAtBoundary,
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

let eColiPosition = { x: 50, y: 50 };
let eColiHeading = randomBetween(0, 359);
let speed = 2;
let rotation = 0;
let size = 5;
let color = "red";
let isRunning = true;

animate(() => {
  CTX.fillStyle = "#000117";
  CTX.fillRect(0, 0, width, height);

  eColiPosition = getNewLocation(eColiHeading, speed, eColiPosition, size);
  eColiHeading += randomBetween(-8, 8);
  const shapeCenter = {
    x: eColiPosition.x + size / 2,
    y: eColiPosition.y + size / 2,
  };
  const rotationAmount = (Math.PI / 180) * rotation;

  CTX.save();
  CTX.translate(shapeCenter.x, shapeCenter.y);
  CTX.rotate(rotationAmount);
  CTX.translate(-size / 2, -size / 2);
  CTX.fillStyle = color;
  CTX.beginPath();
  CTX.arc(size / 2, size / 2, size, 0, 2 * Math.PI);
  CTX.closePath();
  CTX.fill();
  CTX.restore();
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
