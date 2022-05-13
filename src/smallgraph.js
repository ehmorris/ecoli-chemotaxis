import { generateCanvas } from "./helpers.js";
import { graphProperties } from "./data.js";

export const spawnEntityGraph = ({
  getNumerator,
  getDenominator,
  topLabel,
  bottomLabel,
  showPercent,
  backgroundColor,
  fillColor
}) => {
  let barLog = [];
  const CTX = generateCanvas({
    width: graphProperties.width,
    height: graphProperties.height,
    attachNode: ".graphContainer"
  });

  const addValueToBarLog = (value) => {
    barLog.push(value);
    if (barLog.length > graphProperties.maxDataPoints) {
      barLog = barLog.slice(-graphProperties.maxDataPoints);
    }
  };

  const drawGraphPolygon = (arrayOfNums) => {
    CTX.fillStyle = fillColor;
    CTX.beginPath();
    CTX.moveTo(0, graphProperties.height);
    arrayOfNums.forEach((barHeightPercent, index) => {
      CTX.lineTo(
        (graphProperties.width / arrayOfNums.length) * index,
        graphProperties.height - graphProperties.height * barHeightPercent
      );
    });
    CTX.lineTo(graphProperties.width, graphProperties.height);
    CTX.closePath();
    CTX.fill();
  };

  const drawFrame = () => {
    CTX.fillStyle = backgroundColor;
    CTX.fillRect(0, 0, graphProperties.width, graphProperties.height);

    const percentFill = getNumerator() / getDenominator();
    addValueToBarLog(percentFill);
    drawGraphPolygon(barLog);
    const bottomLabelWithOptions = showPercent
      ? `${bottomLabel} (${Math.round(percentFill * 1000) / 10}%)`
      : bottomLabel;

    CTX.fillStyle = "#000";
    CTX.font = "10px sans-serif";
    CTX.fillText(topLabel, 3, 12);
    CTX.fillText(bottomLabelWithOptions, 3, graphProperties.height - 5);

    window.requestAnimationFrame(drawFrame);
  };

  window.requestAnimationFrame(drawFrame);
};
