export const canvasProperties = {
  width: 2000,
  height: 2000,
};

export const graphProperties = {
  width: 100,
  height: 70,
  maxDataPoints: 500,
};

export const attractantSliderProperties = {
  defaultAmount: 800,
  maxAttractantAmount: 2000,
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
  numMotor: 4,
  numReceptor: 3,
  numCheY: 200,
  boundaryPath:
    "M0 80.954C0 51.64 21.5 14.865 53 7.5 87.452-.555 118.061 1 153.226 1 198.529 1 260.839 5.124 312 9.5c38.609 3.302 68 40.941 68 75.494 0 39.247-32.985 78.645-78.5 74.506-44.469-4.043-89.804-7.763-129.887-7.763-33.017 0-55.544.952-87.113 4.263C37.391 160.941 0 125.911 0 80.954z",
};

const cheYSize = 10;
export const cheYProperties = {
  defaultColor: "#6998CA",
  phosphorylatedColor: "#8DC6A6",
  stuckColor: "#8DC6A6",
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
  defaultColor: "#9DA959",
  activeColor: "#FDDE24",
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
    {
      x: ecoliProperties.boundaryLeft + 110,
      y: ecoliProperties.boundaryTop - 8,
    },
  ],
};

const motorSize = 24;
export const motorProperties = {
  defaultColor: "#7EA21E",
  tumbleColor: "#8DC6A6",
  defaultSize: motorSize,
  cheYRequiredToTumble: 1,
  boundaryTop: ecoliProperties.boundaryTop,
  boundaryRight: ecoliProperties.boundaryRight - motorSize / 2,
  boundaryBottom: ecoliProperties.boundaryBottom - motorSize,
  boundaryLeft: ecoliProperties.boundaryRight - motorSize / 2,
  data: [
    {
      position: {
        x: ecoliProperties.boundaryRight - 30,
        y: ecoliProperties.boundaryTop + 20,
      },
      rotation: -32,
      flagella: {
        run: {
          // In Figma: Flagella 1
          from: {
            path: "M465.499 2C481.999 44 466.333 81.5636 405.5 118C309.5 175.5 297.5 156 232.5 255C167.5 354 196.5 532 171.5 642C151.5 730 71 826 3.5 882.5",
            position: {
              x: 79.5,
              y: 474,
            },
          },
          to: {
            path: "M470.5 1C474.667 17.8333 483.359 44.2425 454 75C401.5 130 334.5 200.5 258 253.5C174.054 311.658 35 467.5 10 577.5C-10 665.5 29.6666 823.167 38 893",
            position: {
              x: 75.43,
              y: 474,
            },
          },
          animationDuration: 2_000,
          lightness: 55,
        },
        tumble: {
          // In Figma: Flagella 1
          from: {
            path: "M4.5 1C8.66667 17.8333 31.4999 75.5 51.4999 139.5C74.1791 212.073 93.5 344 66.5 415.5C30.4224 511.039 4.5002 550 4.5002 614.5C4.5002 725 102.167 823.667 110.5 893.5",
            position: {
              x: 541.5,
              y: 474,
            },
          },
          to: {
            path: "M4.5 2C28 55.5 45.5 98.5 118.5 125C164.5 141.699 203 151.264 251 181.5C310.041 218.691 345.5 266.5 345.5 331C345.5 380.5 337 425.5 290 483",
            position: {
              x: 541.5,
              y: 474,
            },
          },
          animationDuration: 1_200,
          lightness: 55,
        },
      },
    },
    {
      position: {
        x: ecoliProperties.boundaryRight - 10,
        y: ecoliProperties.boundaryTop + 80,
      },
      rotation: 2,
      flagella: {
        run: {
          // In Figma: Flagella 3
          from: {
            path: "M386.5 1.5C361.5 73.5 232.64 97 200 173.5C152 286 187 474.5 154.5 613.5C128.5 724.7 -0.166651 759.333 4.50002 834.5",
            position: {
              x: 89.38,
              y: 476.5,
            },
          },
          to: {
            path: "M394.5 1.5C391 20.5 389.76 111.665 327.5 195.5C226.5 331.5 91.0001 363.5 30.4999 536C-10.535 653 7.83329 759.333 12.5 834.5",
            position: {
              x: 81.36,
              y: 476.5,
            },
          },
          animationDuration: 1_400,
          lightness: 40,
        },
        tumble: {
          // In Figma: Flagella 3
          from: {
            path: "M542.5 1.5C539 20.5 514.5 166.248 440 231C333 324 233.5 394.5 201 533.5C175 644.7 109.5 802 3 895",
            position: {
              x: -68,
              y: 476.5,
            },
          },
          to: {
            path: "M220.5 1.5C199.5 61 165.471 99.3844 95.0001 168.5C17.0002 245 -3.2281 365.59 6.50007 445.5C20.5001 560.5 61.4999 714 146 816.5",
            position: {
              x: 255.24,
              y: 476.5,
            },
          },
          animationDuration: 1_000,
          lightness: 40,
        },
      },
    },
    {
      position: {
        x: ecoliProperties.boundaryRight - 30,
        y: ecoliProperties.boundaryTop + 130,
      },
      rotation: 40,
      flagella: {
        run: {
          // In Figma: Flagella 4
          from: {
            path: "M381 4C353.667 21.5 278.3 99.5 233.5 219.5C177.5 369.5 244 544 199.5 653C155 762 98.5 829 1.5 867.5",
            position: {
              x: 43.5,
              y: 441,
            },
          },
          to: {
            path: "M306 4C278.667 21.5 306.8 125 262 245C206 395 68 468 23.5 577C-21 686 23.5001 787 61.5 877",
            position: {
              x: 121.9,
              y: 441,
            },
          },
          animationDuration: 1_200,
          lightness: 38,
        },
        tumble: {
          // In Figma: Flagella 4
          from: {
            path: "M750 4C722.667 21.5 634 52.5 509 31.5001C351.1 4.97301 308.973 130.131 216.5 203C91.5 301.5 59 297 0 297",
            position: {
              x: -321,
              y: 438,
            },
          },
          to: {
            path: "M730 3C670 69.5 670.921 142.436 528.5 228C399.5 305.5 337.473 279.631 245 352.5C120 451 96 459.5 1.49976 422",
            position: {
              x: -305.5,
              y: 441,
            },
          },
          animationDuration: 700,
          lightness: 38,
        },
      },
    },
    {
      position: {
        x: ecoliProperties.boundaryRight - 142,
        y: ecoliProperties.boundaryBottom - 16,
      },
      rotation: 94,
      flagella: {
        run: {
          // In Figma: Flagella 2
          from: {
            path: "M364.5 8.00009C343.5 0.166754 297 -1.29991 279 55.5001C256.5 126.5 276.5 335.5 229 476.5C181.5 617.5 178 843.5 3 951.5",
            position: {
              x: 78,
              y: 315.06,
            },
          },
          to: {
            path: "M350.5 4.00024C307 4.00025 273.5 68 298 133C324.269 202.694 368.37 298.435 270.5 410.5C139.5 560.5 76 570.5 4.5 714",
            position: {
              x: 93.5,
              y: 319,
            },
          },
          animationDuration: 1_800,
          lightness: 49,
        },
        tumble: {
          // In Figma: Flagella 2
          from: {
            path: "M221.5 526.001C138.5 500.5 89.2109 472.043 39.5 390C-22 288.5 12.2455 222.377 32.9999 172.5C63.9999 98 246.5 4.5 288.5 4.5",
            position: {
              x: 222.58,
              y: -202.5,
            },
          },
          to: {
            path: "M342.5 54.0007C233 17.5001 222.5 56.643 156.5 48.0002C130 44.5299 110.152 35.4613 79.5 19.0001C52.5 4.50014 27 2 1.5 5.50014",
            position: {
              x: 98.5,
              y: 269.09,
            },
          },
          animationDuration: 900,
          lightness: 49,
        },
      },
    },
  ],
  shapePath:
    "m24 3.56508c0-1.22831-1.2747-2.15672-2.6595-1.937-.2668.04235-.5402.04235-.807 0-1.3848-.21972-2.6595.70869-2.6595 1.937v.07112h-1.1138v-.07112c0-1.22831-1.2747-2.15672-2.6595-1.937-.2668.04235-.5402.04235-.8071 0-1.3847-.21972-2.6594.70869-2.6594 1.937v.07112s-1.15757.48602-1.94922.48602c-.62768 0-1.48534-.30551-1.81373-.43209-.32495-.86028-.73692-1.55088-1.2493-1.99804-3.25693-2.8423-4.48516-1.356972-4.901517-.853434-.016894.020439-.032462.039246-.046773.056081-.011013.012963-.021277.024769-.030829.035241-.012134.01329-.023149.024443-.033074.033105-.157311.137317-.07189.472167.045651.932767l.000101.00053c.090484.35439.200072.78335.232738 1.2538.056357.81209-.191336 1.16295-.434474 1.50737-.249392.35325-.4940277.69976-.4009261 1.53025.0501031.44694.1642791.78544.2784551 1.12395.114176.33849.228352.67699.278455 1.1239.088682.79101-.106018 1.4154-.298442 2.03255-.206564.6624-.4105102 1.3165-.2584681 2.1594.0961611.5331.3283551.9225.5571151 1.3061.251534.4217.498918.8365.556708 1.4278.07604.778-.228184 1.3458-.537775 1.9236-.283622.5293-.5717313 1.0669-.5760481 1.7823-.0032972.5466.2007871.7298.4081661.916.203981.1831.411122.369.427234.9066.010911.364-.030116.6989-.06805 1.0087-.094529.7717-.169888 1.3871.624963 1.9074 1.11382.729 3.06297-.729 4.73373-2.1871.30877-.2695.608-1.012.86786-2.0635.39865-.1439 1.10229-.3666 1.63823-.3666.79165 0 1.94922.486 1.94922.486v.0711c0 1.2283 1.2747 2.1568 2.6594 1.937.2669-.0423.5403-.0423.8071 0 1.3848.2198 2.6595-.7087 2.6595-1.937v-.0711h1.1138v.0711c0 1.2283 1.2747 2.1568 2.6595 1.937.2668-.0423.5402-.0423.807 0 1.3848.2198 2.6595-.7087 2.6595-1.937z",
};

const attractantSize = 3;
export const attractantProperties = {
  defaultColor: "#C37393",
  defaultSize: attractantSize,
  movementJitter: 6,
  speedMin: 0.6,
  speedMax: 1,
  stickDuration: 200,
  boundaryTop: 0,
  boundaryRight: canvasProperties.width - attractantSize,
  boundaryBottom: canvasProperties.height - attractantSize,
  boundaryLeft: 0,
};
