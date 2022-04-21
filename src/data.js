export const canvasProperties = {
  width: 300,
  height: 180
};

export const graphProperties = {
  width: 300,
  height: 100,
  maxDataPoints: 1000
};

export const cheYSliderProperties = {
  defaultAmount: 10,
  maxCheYAmount: 300
};

export const attractantSliderProperties = {
  defaultAmount: 10,
  maxAttractantAmount: 100
};

const cheYSize = 5;
const cheYLeftMargin = 0.12;
export const cheYProperties = {
  defaultColor: "#c01515",
  phosphorylatedColor: "#ff0000",
  defaultSize: cheYSize,
  phosphorylatedSize: 12,
  movementJitter: 8,
  speedMin: 0.2,
  speedMax: 1.2,
  stickDuration: 120,
  boundaryTop: 0,
  boundaryRight: canvasProperties.width - cheYSize,
  boundaryBottom: canvasProperties.height - cheYSize,
  boundaryLeft: canvasProperties.width * cheYLeftMargin
};

const receptorSize = 8;
const receptorVerticalMargin = 0.2;
const receptorRightMargin = 0.76;
const receptorLeftMargin = 0.12;
export const receptorProperties = {
  defaultColor: "#007008",
  activeColor: "#00da10",
  defaultSize: receptorSize,
  attractantRequiredToDeactivate: 2,
  boundaryTop: canvasProperties.height * receptorVerticalMargin,
  boundaryRight:
    canvasProperties.width -
    canvasProperties.width * receptorRightMargin -
    receptorSize,
  boundaryBottom:
    canvasProperties.height -
    canvasProperties.height * receptorVerticalMargin -
    receptorSize,
  boundaryLeft: canvasProperties.width * receptorLeftMargin
};

const motorSize = 20;
export const motorProperties = {
  defaultColor: "black",
  defaultSize: motorSize,
  boundaryTop: 0,
  boundaryRight: canvasProperties.width - motorSize,
  boundaryBottom: canvasProperties.height - motorSize,
  boundaryLeft: canvasProperties.width - motorSize
};

const attractantSize = 3;
const attractantRightMargin = 0.75;
export const attractantProperties = {
  defaultColor: "#0500ff",
  defaultSize: attractantSize,
  movementJitter: 6,
  speedMin: 0.4,
  speedMax: 0.6,
  stickDuration: 200,
  boundaryTop: 0,
  boundaryRight:
    canvasProperties.width -
    canvasProperties.width * attractantRightMargin -
    attractantSize,
  boundaryBottom: canvasProperties.height - attractantSize,
  boundaryLeft: 0
};
