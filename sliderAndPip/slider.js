import { animate, progress, transition } from "../ecoliSimulation/animation.js";
import { generateCanvas, clampNumber } from "../ecoliSimulation/helpers.js";
import { make24pxCornerRadiusSquirclePath } from "../makeSquircle.js";

// TODO:
// * Move common files like helpers and animation to top level

const cursorImage = new Image();
cursorImage.src = "./sliderAndPip/images/Cursor.png";

const meterImage = new Image();
meterImage.src = "./sliderAndPip/images/Meter.png";

export const makeSlider = ({ value, max, min, attachNode, onInput }) => {
  const attachNodeElement = document.querySelector(attachNode);
  const width = attachNodeElement.clientWidth;
  const leftViewportOffset = attachNodeElement.getBoundingClientRect().left;
  const height = attachNodeElement.clientHeight;
  const rootElement = document.documentElement;
  let controlPositionInPixels =
    clampNumber(progress(min, max, value), 0, 100) / width;
  let rotation = 0;
  let previousTouch;

  const [CTX, element] = generateCanvas({
    width,
    height,
    attachNode,
  });

  element.style.clipPath = `path('${make24pxCornerRadiusSquirclePath(
    width,
    height
  )}')`;

  const setValue = (value) => {
    controlPositionInPixels = clampNumber(
      width * progress(min, max, value),
      32,
      width - 32
    );
  };

  const moveControl = (newPosition, newRotation) => {
    const relativeMousePosition = newPosition - leftViewportOffset;
    const positionInValue = transition(min, max, relativeMousePosition / width);
    rotation = newRotation;
    setValue(positionInValue);
    onInput(positionInValue);
  };

  function moveControlOnMouseMove(e) {
    if (e.buttons === 1) {
      moveControl(e.pageX, e.movementX);
      e.preventDefault();
    }
  }

  function moveControlonTouchMove(e) {
    previousTouch
      ? moveControl(e.pageX, e.pageX - previousTouch.pageX)
      : moveControl(e.pageX, 0);
    e.preventDefault();
    previousTouch = e;
  }

  element.addEventListener("mousedown", (e) => {
    moveControl(e.pageX, e.movementX);
    rotation = 0;
    document.addEventListener("mousemove", moveControlOnMouseMove);
  });

  document.addEventListener("mouseup", () => {
    rotation = 0;
    document.removeEventListener("mousemove", moveControlOnMouseMove);
  });

  element.addEventListener("touchstart", (e) => {
    moveControl(e.pageX, 0);
    document.addEventListener("touchmove", moveControlonTouchMove);
  });

  document.addEventListener("touchend", () => {
    document.removeEventListener("touchmove", moveControlonTouchMove);
  });

  animate(() => {
    CTX.fillStyle = "#010010";
    CTX.fillRect(0, 0, width, height);

    // Pip
    // Image is 6040x128
    const leftValue = parseFloat(
      rootElement.style.getPropertyValue("--slider-pip-left-value")
    );
    const pipWidth = width * (leftValue / 100);
    CTX.drawImage(
      meterImage,
      6040 - pipWidth,
      0,
      pipWidth,
      height * 2,
      0,
      0,
      pipWidth,
      height
    );

    CTX.font = "800 8px/1 -apple-system, BlinkMacSystemFont, sans-serif";
    CTX.fillStyle = "rgba(255, 255, 255, .8)";
    // CTX.fillText("HUNGER", pipWidth - 124, height / 2 + 3);

    // Control
    CTX.save();
    CTX.translate(controlPositionInPixels, 32);
    CTX.rotate((-rotation * Math.PI) / 180);
    CTX.drawImage(cursorImage, -26, -26, 52, 52);
    CTX.restore();

    if (pipWidth > controlPositionInPixels + 100) {
      // CTX.fillText("FOOD", controlPositionInPixels - 60, height / 2 + 3);
    } else {
      // CTX.fillText("FOOD", controlPositionInPixels + 34, height / 2 + 3);
    }
  });

  return { setValue };
};
