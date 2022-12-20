export const canvasProperties = {
  width: 800,
  height: 300,
};

export const graphProperties = {
  width: 100,
  height: 70,
  maxDataPoints: 500,
};

export const attractantSliderProperties = {
  defaultAmount: 100,
  maxAttractantAmount: 8000,
};

const ecoliWidth = 380;
const ecoliHeight = 159;
export const ecoliProperties = {
  width: ecoliWidth,
  height: ecoliHeight,
  boundaryTop: canvasProperties.height / 2 - ecoliHeight / 2,
  boundaryRight: canvasProperties.width / 2 + ecoliWidth / 2,
  boundaryBottom: canvasProperties.height / 2 + ecoliHeight / 2,
  boundaryLeft: canvasProperties.width / 2 - ecoliWidth / 2,
  numMotor: 3,
  numReceptor: 2,
  boundaryPath:
    "M0 80.954C0 51.64 21.5 14.865 53 7.5 87.452-.555 118.061 1 153.226 1 198.529 1 260.839 5.124 312 9.5c38.609 3.302 68 40.941 68 75.494 0 39.247-32.985 78.645-78.5 74.506-44.469-4.043-89.804-7.763-129.887-7.763-33.017 0-55.544.952-87.113 4.263C37.391 160.941 0 125.911 0 80.954z",
};

export const numCheY = 150;
const cheYSize = 10;
export const cheYProperties = {
  defaultColor: "#096729",
  phosphorylatedColor: "#00FF85",
  stuckColor: "#000",
  defaultSize: cheYSize,
  phosphorylatedSize: cheYSize,
  movementJitter: 40,
  speedMin: 0.4,
  speedMax: 2.2,
  receptorStickDuration: 120,
  motorStickDuration: 300,
  shapePath:
    "m8.8248 6.17225c0 .62539-.02729.83998-.27251 1.38756-.35155.78504-.62273.72377-.901 1.11465-.52174.36734-.85301.87696-1.50555 1.05263-.49354.13286-.75763.27291-1.29989.27291-.66208 0-1.08113-.20217-1.66686-.39694-.5283-.17567-1.23231-1.14896-1.66686-1.45492-.733221-.51624-.989024-.47315-1.340578-1.25818-.2452152-.54758-.155553-.66648-.155553-1.29187 0-.75543.339213-1.13504.689588-1.77034.224392-.40686.467443-1.34286.806543-1.67464.44074-.43122.32356-.94658.91408-1.211819.72729-.326667 2.19455-.94128808 3.06488-.94128808.97938 0 1.14482.75931608 1.9357 1.16641708.55011.28317 1.46876.55488 1.87338.98669.54745.58425.51118 1.5735.69634 2.3445.07779.32399-1.17171 1.32999-1.17171 1.67464z",
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
  boundaryLeft: ecoliProperties.boundaryLeft - receptorSize / 2,
  positions: [
    { x: ecoliProperties.boundaryLeft, y: ecoliProperties.boundaryTop + 40 },
    {
      x: ecoliProperties.boundaryLeft - 4,
      y: ecoliProperties.boundaryTop + 92,
    },
  ],
};

const motorSize = 24;
export const motorProperties = {
  defaultColor: "#096729",
  tumbleColor: "#00FF85",
  defaultSize: motorSize,
  cheYRequiredToTumble: 1,
  boundaryTop: ecoliProperties.boundaryTop,
  boundaryRight: ecoliProperties.boundaryRight - motorSize / 2,
  boundaryBottom: ecoliProperties.boundaryBottom - motorSize,
  boundaryLeft: ecoliProperties.boundaryRight - motorSize / 2,
  positions: [
    {
      x: ecoliProperties.boundaryRight - 24,
      y: ecoliProperties.boundaryTop + 30,
    },
    {
      x: ecoliProperties.boundaryRight - 14,
      y: ecoliProperties.boundaryTop + 80,
    },
    {
      x: ecoliProperties.boundaryRight - 30,
      y: ecoliProperties.boundaryTop + 120,
    },
  ],
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
  boundaryRight: canvasProperties.width - attractantSize,
  boundaryBottom: canvasProperties.height - attractantSize,
  boundaryLeft: 0,
  defaultPosition: { x: 40, y: 40 },
};
