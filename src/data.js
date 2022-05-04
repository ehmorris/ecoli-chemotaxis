export const canvasProperties = {
  width: 450,
  height: 200
};

export const graphProperties = {
  width: 150,
  height: 60,
  maxDataPoints: 1000
};

export const cheYSliderProperties = {
  defaultAmount: 80,
  maxCheYAmount: 300
};

export const attractantSliderProperties = {
  defaultAmount: 40,
  maxAttractantAmount: 100
};

const cheYSize = 5;
const cheYLeftMargin = 0.2;
export const cheYProperties = {
  defaultColor: "#c01515",
  phosphorylatedColor: "#ff0000",
  defaultSize: cheYSize,
  phosphorylatedSize: 12,
  movementJitter: 8,
  speedMin: 0.2,
  speedMax: 1.2,
  receptorStickDuration: 120,
  motorStickDuration: 300,
  boundaryTop: 0,
  boundaryRight: canvasProperties.width - cheYSize,
  boundaryBottom: canvasProperties.height - cheYSize,
  boundaryLeft: canvasProperties.width * cheYLeftMargin
};

const receptorSize = 8;
const receptorVerticalMargin = 0.2;
const receptorRightMargin = 0.8;
const receptorLeftMargin = 0.2;
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
  tumbleColor: "#cccccc",
  defaultSize: motorSize,
  boundaryTop: 0,
  cheYRequiredToTumble: 2,
  boundaryRight: canvasProperties.width - motorSize,
  boundaryBottom: canvasProperties.height - motorSize,
  boundaryLeft: canvasProperties.width - motorSize
};

const attractantSize = 3;
const attractantRightMargin = 0.8;
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
