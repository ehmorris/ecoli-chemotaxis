export const canvasProperties = {
  width: 370,
  height: 140
};

export const graphProperties = {
  width: 100,
  height: 70,
  maxDataPoints: 500
};

export const cheYSliderProperties = {
  defaultAmount: 140,
  maxCheYAmount: 500
};

export const attractantSliderProperties = {
  defaultAmount: 40,
  maxAttractantAmount: 200
};

const cheYSize = 5;
const cheYLeftMargin = 0.2;
export const cheYProperties = {
  defaultColor: "#c01515",
  phosphorylatedColor: "#ff0000",
  defaultSize: cheYSize,
  phosphorylatedSize: 12,
  movementJitter: 40,
  speedMin: 0.4,
  speedMax: 2.2,
  receptorStickDuration: 120,
  motorStickDuration: 300,
  boundaryTop: 0,
  boundaryRight: canvasProperties.width - cheYSize,
  boundaryBottom: canvasProperties.height - cheYSize,
  boundaryLeft: canvasProperties.width * cheYLeftMargin
};

const receptorSize = 16;
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

const motorSize = 24;
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
