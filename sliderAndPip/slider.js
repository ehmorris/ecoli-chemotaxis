import { animate, progress, transition } from "../ecoliSimulation/animation.js";
import { generateCanvas, clampNumber } from "../ecoliSimulation/helpers.js";

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

  const [CTX, element] = generateCanvas({
    width,
    height,
    attachNode,
  });

  const setValue = (value) => {
    controlPositionInPixels = clampNumber(
      width * progress(min, max, value),
      32,
      width - 32
    );
  };

  const moveControl = ({ screenX }) => {
    const relativeMousePosition = screenX - leftViewportOffset;
    const positionInValue = transition(min, max, relativeMousePosition / width);
    setValue(positionInValue);
    onInput(positionInValue);
  };

  function moveControlOnMove(event) {
    if (event.buttons === 1) {
      moveControl(event);
      event.preventDefault();
    }
  }

  element.addEventListener("mousedown", (e) => {
    moveControl(e);
    document.addEventListener("mousemove", moveControlOnMove);
  });

  document.addEventListener("mouseup", () => {
    document.removeEventListener("mousemove", moveControlOnMove);
  });

  animate(() => {
    CTX.fillStyle = "#010010";
    CTX.fillRect(0, 0, width, height);

    // Pip
    // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
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

    // Control
    CTX.drawImage(cursorImage, controlPositionInPixels - 26, 6, 52, 52);
  });

  return { setValue };
};
