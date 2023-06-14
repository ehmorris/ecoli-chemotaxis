import { graphProperties } from "./data.js";
import { animate } from "./animation.js";

export const generateTopDownViz = ({ getNumerator, denominator }) => {
  const generateImageTag = (srcurl) => {
    const element = document.createElement("img");
    element.width = graphProperties.width;
    element.height = graphProperties.height;
    element.src = srcurl;
    document.querySelector(".heroGif").appendChild(element);
    return element;
  };

  const runGifURL = `${window.location.href}ecoliSimulation/images/Run.gif`;
  const tumbleGifURL = `${window.location.href}ecoliSimulation/images/Tumble.gif`;

  const imageTag = generateImageTag(runGifURL);

  animate(() => {
    const percentFill = getNumerator() / denominator;
    const newSrc = percentFill > 0.5 ? tumbleGifURL : runGifURL;
    if (newSrc !== imageTag.src) {
      imageTag.src = newSrc;
    }
  });
};
