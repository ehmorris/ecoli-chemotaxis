export const canvasProperties = {
  width: 500,
  height: 200
};

export const graphProperties = {
  width: 100,
  height: 70,
  maxDataPoints: 500
};

export const cheYSliderProperties = {
  defaultAmount: 100,
  maxCheYAmount: 500
};

export const attractantSliderProperties = {
  defaultAmount: 40,
  maxAttractantAmount: 200
};

export const ecoliProperties = {
  boundaryTop: 20,
  boundaryRight: canvasProperties.width - 20,
  boundaryBottom: canvasProperties.height - 20,
  boundaryLeft: canvasProperties.width * 0.2,
  numMotor: 2,
  numReceptor: 2,
  boundaryPath:
    "M0 80.954C0 51.64 21.5 14.865 53 7.5 87.452-.555 118.061 1 153.226 1 198.529 1 260.839 5.124 312 9.5c38.609 3.302 68 40.941 68 75.494 0 39.247-32.985 78.645-78.5 74.506-44.469-4.043-89.804-7.763-129.887-7.763-33.017 0-55.544.952-87.113 4.263C37.391 160.941 0 125.911 0 80.954z"
};

const cheYSize = 5;
export const cheYProperties = {
  defaultColor: "#096729",
  phosphorylatedColor: "#00FF85",
  stuckColor: "#000",
  defaultSize: cheYSize,
  phosphorylatedSize: 12,
  movementJitter: 40,
  speedMin: 0.4,
  speedMax: 2.2,
  receptorStickDuration: 120,
  motorStickDuration: 300,
  boundaryTop: ecoliProperties.boundaryTop,
  boundaryRight: ecoliProperties.boundaryRight - cheYSize,
  boundaryBottom: ecoliProperties.boundaryBottom - cheYSize,
  boundaryLeft: ecoliProperties.boundaryLeft
};

const receptorSize = 16;
export const receptorProperties = {
  defaultColor: "#096729",
  activeColor: "#00FF85",
  defaultSize: receptorSize,
  attractantRequiredToDeactivate: 2,
  boundaryTop: ecoliProperties.boundaryTop,
  boundaryRight: ecoliProperties.boundaryLeft - receptorSize / 2,
  boundaryBottom: ecoliProperties.boundaryBottom - receptorSize,
  boundaryLeft: ecoliProperties.boundaryLeft - receptorSize / 2
};

const motorSize = 24;
export const motorProperties = {
  defaultColor: "#096729",
  tumbleColor: "#00FF85",
  defaultSize: motorSize,
  cheYRequiredToTumble: 2,
  boundaryTop: ecoliProperties.boundaryTop,
  boundaryRight: ecoliProperties.boundaryRight - motorSize / 2,
  boundaryBottom: ecoliProperties.boundaryBottom - motorSize,
  boundaryLeft: ecoliProperties.boundaryRight - motorSize / 2
};

const attractantSize = 3;
export const attractantProperties = {
  defaultColor: "#265A15",
  defaultSize: attractantSize,
  movementJitter: 6,
  speedMin: 0.4,
  speedMax: 0.6,
  stickDuration: 200,
  boundaryTop: 0,
  boundaryRight: ecoliProperties.boundaryLeft - attractantSize,
  boundaryBottom: canvasProperties.height - attractantSize,
  boundaryLeft: 0
};
