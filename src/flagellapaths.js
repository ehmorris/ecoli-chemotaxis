import { transition, transitionPath } from "./animation.js";

export const transitionPathPair = (pathPair, progress, easing) => {
  return {
    path: transitionPath(
      pathPair.from.path,
      pathPair.to.path,
      progress,
      easing
    ),
    position: {
      x: transition(
        pathPair.from.position.x,
        pathPair.to.position.x,
        progress,
        easing
      ),
      y: transition(
        pathPair.from.position.y,
        pathPair.to.position.y,
        progress,
        easing
      ),
    },
  };
};

export const runPathPairs = [
  {
    // In Figma: Background 1
    from: {
      path: "M248 2.5C220.667 49.5 108.5 129.5 88.5 319.5C68.4999 509.5 77 661.5 4 867.5",
      position: {
        x: 188,
        y: 413.5,
      },
    },
    to: {
      path: "M370 2.5C342.667 49.5 328.5 210 142.5 370C-43.4999 530 12.5001 714.5 12.5001 941.5",
      position: {
        x: 66.59,
        y: 413.5,
      },
    },
    animationDuration: 1_000,
    lightness: 20,
  },
  {
    // In Figma: Background 2
    from: {
      path: "M283.5 0.5C274.5 94.8333 121 188.5 73.5 409C26 629.5 91 673.5 4 903.55",
      position: {
        x: 229,
        y: 470.5,
      },
    },
    to: {
      path: "M346.5 0.5C337.5 94.8333 339 206 201 344C63 482 4 653 4 882.5",
      position: {
        x: 166,
        y: 470.5,
      },
    },
    animationDuration: 1_500,
    lightness: 23,
  },
  {
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
  {
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
  {
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
  {
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
];

export const tumblePathPairs = [
  {
    // In Figma: Background 1
    from: {
      path: "M550 4.5C489 32.5 293 97 211 261.5C129 426 123.667 581.333 3.5 696.5",
      position: {
        x: -117.5,
        y: 382.5,
      },
    },
    to: {
      path: "M591 4.5C530 32.5 361.5 106.5 279.5 271C197.5 435.5 113.5 509 2.5 434.5",
      position: {
        x: -159.5,
        y: 382.5,
      },
    },
    animationDuration: 800,
    lightness: 20,
  },
  {
    // In Figma: Background 2
    from: {
      path: "M410.5 2.5C445 81.5 589 336 451 474C313 612 13 829 4.5 957",
      position: {
        x: 162.5,
        y: 429.5,
      },
    },
    to: {
      path: "M41.4999 2.5C75.9999 81.5 -34.5001 215.5 18.9999 352.5C72.4999 489.5 213 633 204.5 761",
      position: {
        x: 531.11,
        y: 429.5,
      },
    },
    animationDuration: 1_100,
    lightness: 23,
  },
  {
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
  {
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
  {
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
  {
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
];
