import { generateCanvas } from "./helpers.js";
import { cheYProperties, graphProperties } from "./data.js";

export const spawnEntityGraph = (
  getNumerator,
  getDenominator,
  topLabel,
  bottomLabel
) => {
  let barLog = [];
  const CTX = generateCanvas(graphProperties.width, graphProperties.height);

  const addValueToBarLog = (value) => {
    barLog.push(value);
    if (barLog.length > graphProperties.maxDataPoints) {
      barLog = barLog.slice(-graphProperties.maxDataPoints);
    }
  };

  const drawGraphPolygon = (arrayOfNums) => {
    CTX.fillStyle = cheYProperties.phosphorylatedColor;
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
    CTX.fillStyle = cheYProperties.defaultColor;
    CTX.fillRect(0, 0, graphProperties.width, graphProperties.height);

    const percentFill = getNumerator() / getDenominator();
    addValueToBarLog(percentFill);
    drawGraphPolygon(barLog);

    CTX.fillStyle = "#fff";
    CTX.font = "10px sans-serif";
    CTX.fillText(topLabel, 3, 12);
    CTX.fillText(
      `${bottomLabel} (${Math.round(percentFill * 1000) / 10}%)`,
      3,
      graphProperties.height - 5
    );

    window.requestAnimationFrame(drawFrame);
  };

  const reset = () => {
    barLog = [];
  };

  window.requestAnimationFrame(drawFrame);

  return { reset };
};
