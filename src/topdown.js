import { generateCanvas } from "./helpers.js";
import { graphProperties } from "./data.js";

export const spawnTopDown = ({ getNumerator, getDenominator }) => {
  const backgroundColor = "#000";
  let tumbleState = false;
  const CTX = generateCanvas({
    width: graphProperties.width,
    height: graphProperties.height,
    attachNode: ".graphContainer"
  });

  const drawGraph = (state) => {
    CTX.fillStyle = state ? "#ddd" : "#222";
    CTX.fillRect(
      graphProperties.width / 4,
      graphProperties.height / 4,
      graphProperties.width / 2,
      graphProperties.height / 2
    );
    CTX.fill();
  };

  const drawFrame = () => {
    CTX.fillStyle = backgroundColor;
    CTX.fillRect(0, 0, graphProperties.width, graphProperties.height);

    const percentFill = getNumerator() / getDenominator();
    tumbleState = percentFill > 0.5;
    drawGraph(tumbleState);

    window.requestAnimationFrame(drawFrame);
  };

  window.requestAnimationFrame(drawFrame);
};
