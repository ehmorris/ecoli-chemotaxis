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

  const runGifURL = `${window.location.href}/src/images/Run.gif`;
  const tumbleGifURL = `${window.location.href}/src/images/Tumble.gif`;

  const imageTag = generateImageTag(runGifURL);

  const drawFrame = () => {
    const percentFill = getNumerator() / getDenominator();
    const newSrc = percentFill > 0.5 ? tumbleGifURL : runGifURL;
    if (newSrc !== imageTag.src) {
      imageTag.src = newSrc;
    }

    window.requestAnimationFrame(drawFrame);
  };

  window.requestAnimationFrame(drawFrame);
};
