import { graphProperties } from "./data.js";

export const spawnTopDown = ({ getNumerator, getDenominator }) => {
  const generateImageTag = (srcurl) => {
    const element = document.createElement("img");
    element.width = graphProperties.width;
    element.height = graphProperties.height;
    element.src = srcurl;
    document.querySelector(".graphContainer").appendChild(element);
    return element;
  };

  const imageTag = generateImageTag("./src/images/Run.gif");

  const drawFrame = () => {
    const percentFill = getNumerator() / getDenominator();
    const newSrc =
      percentFill > 0.5 ? "./src/images/Tumble.gif" : "./src/images/Run.gif";
    if (newSrc !== imageTag.src) {
      imageTag.src = newSrc;
    }

    window.requestAnimationFrame(drawFrame);
  };

  window.requestAnimationFrame(drawFrame);
};
