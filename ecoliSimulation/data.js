const width = window.innerWidth - 96;

export const canvasProperties = {
  width,
  height: Math.min(Math.max(width * 0.4, 400), width),
  illustrationScale: Math.min(width / 1000, 1),
};

export const graphProperties = {
  width: 100,
  height: 70,
  maxDataPoints: 500,
};

export const attractantSliderProperties = {
  defaultAmount: 0,
  maxAttractantAmount: 20,
};

const ecoliWidth = 508;
const ecoliHeight = 274;
export const ecoliProperties = {
  width: ecoliWidth,
  height: ecoliHeight,
  boundaryTop: canvasProperties.height / 2 - ecoliHeight / 2,
  boundaryRight: canvasProperties.width / 2.5 + ecoliWidth / 2,
  boundaryBottom: canvasProperties.height / 2 + ecoliHeight / 2,
  boundaryLeft: canvasProperties.width / 2.5 - ecoliWidth / 2,
  numMotor: 4,
  numReceptor: 8,
  numCheY: 200,
  boundaryPath:
    "M305.5 34.9995C208 4.71556 30.4998 -38.5 3.49985 69.9996C-18.9549 160.234 80.5 214.5 192.5 244.5C373.814 293.066 489.717 281.19 505 214.5C527 118.5 415.5 69.166 305.5 34.9995Z",
};

const cheYSize = 10;
export const cheYProperties = {
  defaultColor: "#0E4782",
  phosphorylatedColor: "#C2D6FF",
  stuckColor: "#C2D6FF",
  defaultSize: cheYSize,
  phosphorylatedSize: cheYSize,
  movementJitter: 40,
  speedMin: 1,
  speedMax: 4,
  receptorStickDuration: 40,
  motorStickDuration: 400,
  maxPhosphorylatedDuration: 8_000,
  shapePath:
    "m8.8248 6.17225c0 .62539-.02729.83998-.27251 1.38756-.35155.78504-.62273.72377-.901 1.11465-.52174.36734-.85301.87696-1.50555 1.05263-.49354.13286-.75763.27291-1.29989.27291-.66208 0-1.08113-.20217-1.66686-.39694-.5283-.17567-1.23231-1.14896-1.66686-1.45492-.733221-.51624-.989024-.47315-1.340578-1.25818-.2452152-.54758-.155553-.66648-.155553-1.29187 0-.75543.339213-1.13504.689588-1.77034.224392-.40686.467443-1.34286.806543-1.67464.44074-.43122.32356-.94658.91408-1.211819.72729-.326667 2.19455-.94128808 3.06488-.94128808.97938 0 1.14482.75931608 1.9357 1.16641708.55011.28317 1.46876.55488 1.87338.98669.54745.58425.51118 1.5735.69634 2.3445.07779.32399-1.17171 1.32999-1.17171 1.67464z",
};

const receptorSize = 4;
export const receptorProperties = {
  defaultColor: "#000117",
  activeColor: "#000117",
  defaultSize: receptorSize,
  boundaryTop: ecoliProperties.boundaryTop,
  boundaryRight: ecoliProperties.boundaryLeft - receptorSize / 2,
  boundaryBottom: ecoliProperties.boundaryBottom - receptorSize,
  boundaryLeft: ecoliProperties.boundaryLeft - receptorSize / 2,
  positions: [
    {
      x: ecoliProperties.boundaryLeft + 90,
      y: ecoliProperties.boundaryTop + 82,
    },
    {
      x: ecoliProperties.boundaryLeft + 40,
      y: ecoliProperties.boundaryTop + 100,
    },
    {
      x: ecoliProperties.boundaryLeft + 150,
      y: ecoliProperties.boundaryTop + 20,
    },
    {
      x: ecoliProperties.boundaryLeft + 90,
      y: ecoliProperties.boundaryTop + 40,
    },
    {
      x: ecoliProperties.boundaryLeft + 40,
      y: ecoliProperties.boundaryTop + 140,
    },
    {
      x: ecoliProperties.boundaryLeft + 90,
      y: ecoliProperties.boundaryTop + 170,
    },
    {
      x: ecoliProperties.boundaryLeft + 30,
      y: ecoliProperties.boundaryTop + 62,
    },
    {
      x: ecoliProperties.boundaryLeft + 50,
      y: ecoliProperties.boundaryTop + 40,
    },
  ],
};

const motorSize = 24;
export const motorProperties = {
  defaultColor: "#496380",
  tumbleColor: "#C2D6FF",
  defaultSize: motorSize,
  cheYRequiredToTumble: 2,
  boundaryTop: ecoliProperties.boundaryTop,
  boundaryRight: ecoliProperties.boundaryRight - motorSize / 2,
  boundaryBottom: ecoliProperties.boundaryBottom - motorSize,
  boundaryLeft: ecoliProperties.boundaryRight - motorSize / 2,
  positionsAndRotations: [
    {
      x: ecoliProperties.boundaryRight - 62,
      y: ecoliProperties.boundaryTop + 120,
      r: -32,
    },
    {
      x: ecoliProperties.boundaryRight - 48,
      y: ecoliProperties.boundaryTop + 184,
      r: 12,
    },
    {
      x: ecoliProperties.boundaryRight - 78,
      y: ecoliProperties.boundaryTop + 232,
      r: 40,
    },
    {
      x: ecoliProperties.boundaryRight - 189,
      y: ecoliProperties.boundaryBottom - 40,
      r: 98,
    },
  ],
  shapePath:
    "m24 3.56508c0-1.22831-1.2747-2.15672-2.6595-1.937-.2668.04235-.5402.04235-.807 0-1.3848-.21972-2.6595.70869-2.6595 1.937v.07112h-1.1138v-.07112c0-1.22831-1.2747-2.15672-2.6595-1.937-.2668.04235-.5402.04235-.8071 0-1.3847-.21972-2.6594.70869-2.6594 1.937v.07112s-1.15757.48602-1.94922.48602c-.62768 0-1.48534-.30551-1.81373-.43209-.32495-.86028-.73692-1.55088-1.2493-1.99804-3.25693-2.8423-4.48516-1.356972-4.901517-.853434-.016894.020439-.032462.039246-.046773.056081-.011013.012963-.021277.024769-.030829.035241-.012134.01329-.023149.024443-.033074.033105-.157311.137317-.07189.472167.045651.932767l.000101.00053c.090484.35439.200072.78335.232738 1.2538.056357.81209-.191336 1.16295-.434474 1.50737-.249392.35325-.4940277.69976-.4009261 1.53025.0501031.44694.1642791.78544.2784551 1.12395.114176.33849.228352.67699.278455 1.1239.088682.79101-.106018 1.4154-.298442 2.03255-.206564.6624-.4105102 1.3165-.2584681 2.1594.0961611.5331.3283551.9225.5571151 1.3061.251534.4217.498918.8365.556708 1.4278.07604.778-.228184 1.3458-.537775 1.9236-.283622.5293-.5717313 1.0669-.5760481 1.7823-.0032972.5466.2007871.7298.4081661.916.203981.1831.411122.369.427234.9066.010911.364-.030116.6989-.06805 1.0087-.094529.7717-.169888 1.3871.624963 1.9074 1.11382.729 3.06297-.729 4.73373-2.1871.30877-.2695.608-1.012.86786-2.0635.39865-.1439 1.10229-.3666 1.63823-.3666.79165 0 1.94922.486 1.94922.486v.0711c0 1.2283 1.2747 2.1568 2.6594 1.937.2669-.0423.5403-.0423.8071 0 1.3848.2198 2.6595-.7087 2.6595-1.937v-.0711h1.1138v.0711c0 1.2283 1.2747 2.1568 2.6595 1.937.2668-.0423.5402-.0423.807 0 1.3848.2198 2.6595-.7087 2.6595-1.937z",
};

export const attractantProperties = {
  defaultColor: "#9E56C0",
  defaultSize: 2,
};
