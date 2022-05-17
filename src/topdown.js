import { graphProperties } from "./data.js";
import RunGIF from "./images/Run.gif";
import TumbleGIF from "./images/Tumble.gif";

export const spawnTopDown = ({ getNumerator, getDenominator }) => {
  const generateImageTag = (src) => {
    const element = document.createElement("img");
    element.width = graphProperties.width;
    element.height = graphProperties.height;
    element.src = src;
    document.querySelector(".graphContainer").appendChild(element);
    return element;
  };

  const imageTag = generateImageTag(RunGIF);

  const drawFrame = () => {
    const percentFill = getNumerator() / getDenominator();
    const newSrc = percentFill > 0.5 ? TumbleGIF : RunGIF;
    if (newSrc !== imageTag.src) {
      imageTag.src = newSrc;
    }

    window.requestAnimationFrame(drawFrame);
  };

  window.requestAnimationFrame(drawFrame);
};
