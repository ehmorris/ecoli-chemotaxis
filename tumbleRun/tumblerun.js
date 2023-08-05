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
  attachNode: ".tumbleRunCanvasContainer",
});

canvasEl.style.clipPath = `path('${make24pxCornerRadiusSquirclePath(
  width,
  height
)}')`;

let eColiPosition = { x: 50, y: 50 };
let eColiHeading = randomBetween(0, 359);
let speed = 1;
let rotation = 0;
let size = 5;
let color = "red";
let isRunning = true;

animate(() => {
  CTX.fillStyle = "#000117";
  CTX.fillRect(0, 0, width, height);

  getNewRandomLocationInBoundary(
    CTX,
    eColiHeading,
    speed,
    eColiPosition,
    size
  ).then((nextPosition) => {
    const shapeCenter = {
      x: nextPosition.x + size / 2,
      y: nextPosition.y + size / 2,
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

    eColiPosition = nextPosition;
    eColiHeading += randomBetween(-8, 8);
  });
});

// Recurse until new location inside boundary is found
const getNewRandomLocationInBoundary = (
  context,
  heading,
  currentSpeed,
  currentLocation,
  currentSize
) => {
  // Test new location
  return new Promise((resolve) => {
    const prospectiveNewLocation = nextPositionAlongHeading(
      currentLocation,
      currentSpeed,
      heading
    );

    if (
      isAtBoundary(prospectiveNewLocation, 0, width - size, height - size, 0)
    ) {
      eColiHeading = randomBetween(1, 360);
      return resolve(
        getNewRandomLocationInBoundary(
          context,
          eColiHeading,
          currentSpeed,
          currentLocation,
          currentSize
        )
      );
    } else {
      return resolve(prospectiveNewLocation);
    }
  });
};
