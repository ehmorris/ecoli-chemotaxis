import {
  attractantProperties,
  receptorProperties,
  attractantSliderProperties,
} from "../data.js";
import { randomBetween, generateArrayOfX } from "../helpers.js";

export const makeReceptor = (CTX, state) => {
  const props = new Map()
    .set("position", receptorProperties.positions.pop())
    .set("type", "receptor")
    .set("color", receptorProperties.activeColor)
    .set("size", receptorProperties.defaultSize)
    .set("active", true);

  const sliderPipReference = document.querySelector("#sliderPip");
  let numAttractantRequiredForDeactivation = 0;

  const activate = () => {
    props.set("active", true).set("color", receptorProperties.activeColor);
  };

  const deactivate = () => {
    props.set("active", false).set("color", receptorProperties.defaultColor);
  };

  const generateAttractantPosition = () => {
    // Sides are 1-top, 2-right, 3-bottom, 4-left
    const side = Math.round(randomBetween(1, 4));
    let coords;

    if (side === 1) {
      coords = {
        x: randomBetween(
          props.get("position").x,
          props.get("position").x +
            props.get("size") -
            attractantProperties.defaultSize
        ),
        y: props.get("position").y - attractantProperties.defaultSize,
      };
    }

    if (side === 2) {
      coords = {
        x: props.get("position").x + props.get("size"),
        y: randomBetween(
          props.get("position").y,
          props.get("position").y +
            props.get("size") -
            attractantProperties.defaultSize
        ),
      };
    }

    if (side === 3) {
      coords = {
        x: randomBetween(
          props.get("position").x,
          props.get("position").x +
            props.get("size") -
            attractantProperties.defaultSize
        ),
        y: props.get("position").y + props.get("size"),
      };
    }

    if (side === 4) {
      coords = {
        x: props.get("position").x - attractantProperties.defaultSize,
        y: randomBetween(
          props.get("position").y,
          props.get("position").y +
            props.get("size") -
            attractantProperties.defaultSize
        ),
      };
    }

    return coords;
  };

  let attractantPositions = generateArrayOfX(
    state.get("numAttractantPerReceptor"),
    generateAttractantPosition
  );

  const updateAttractantPositions = () => {
    const numNewAttractant =
      state.get("numAttractantPerReceptor") - attractantPositions.length;

    if (numNewAttractant >= 0) {
      attractantPositions = attractantPositions.concat(
        generateArrayOfX(numNewAttractant, generateAttractantPosition)
      );
    } else {
      attractantPositions.splice(numNewAttractant);
    }
  };

  const updateActiveState = () => {
    if (
      state.get("numAttractantPerReceptor") * 1.2 >
      numAttractantRequiredForDeactivation
    ) {
      numAttractantRequiredForDeactivation += 0.2;
    }

    // Decrease methlyation threshold always
    numAttractantRequiredForDeactivation = Math.max(
      1,
      numAttractantRequiredForDeactivation - 0.1
    );

    sliderPipReference.style.left = `${
      (numAttractantRequiredForDeactivation /
        attractantSliderProperties.maxAttractantAmount) *
      100
    }%`;

    state.get("numAttractantPerReceptor") < numAttractantRequiredForDeactivation
      ? activate()
      : deactivate();
  };

  const draw = () => {
    updateActiveState();

    CTX.save();
    CTX.fillStyle = props.get("color");
    CTX.fillRect(
      props.get("position").x,
      props.get("position").y,
      props.get("size"),
      props.get("size")
    );

    updateAttractantPositions();
    CTX.fillStyle = attractantProperties.defaultColor;
    attractantPositions.forEach(({ x, y }) => {
      CTX.fillRect(
        x,
        y,
        attractantProperties.defaultSize,
        attractantProperties.defaultSize
      );
    });
    CTX.restore();
  };

  return { draw, props };
};
