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

  const rootElement = document.documentElement;
  let numAttractantRequiredForDeactivation = 0;

  const activate = () => {
    props.set("active", true).set("color", receptorProperties.activeColor);
  };

  const deactivate = () => {
    props.set("active", false).set("color", receptorProperties.defaultColor);
  };

  const generateAttractantPosition = () => {
    return {
      x: randomBetween(
        props.get("position").x - attractantProperties.defaultSize,
        props.get("position").x + props.get("size")
      ),
      y: randomBetween(
        props.get("position").y - attractantProperties.defaultSize,
        props.get("position").y + props.get("size")
      ),
    };
  };

  let attractantPositions = generateArrayOfX(
    Math.round(state.get("numAttractantPerReceptor")),
    generateAttractantPosition
  );

  const updateAttractantPositions = () => {
    const numNewAttractant =
      Math.round(state.get("numAttractantPerReceptor")) -
      attractantPositions.length;

    if (numNewAttractant >= 0) {
      attractantPositions = attractantPositions.concat(
        generateArrayOfX(numNewAttractant, generateAttractantPosition)
      );
    } else {
      attractantPositions.splice(numNewAttractant);
    }
  };

  const updateActiveState = () => {
    // Methlyation threshold chases numAttractant with a delay
    const differenceDivisor = 80;
    const difference =
      Math.abs(
        state.get("numAttractantPerReceptor") -
          numAttractantRequiredForDeactivation
      ) / differenceDivisor;
    if (
      state.get("numAttractantPerReceptor") * 1.1 >
      numAttractantRequiredForDeactivation
    ) {
      numAttractantRequiredForDeactivation += difference;
    }
    if (numAttractantRequiredForDeactivation > 1) {
      numAttractantRequiredForDeactivation -= difference * 0.7;
    }

    rootElement.style.setProperty(
      "--slider-pip-left-value",
      `${
        (numAttractantRequiredForDeactivation /
          attractantSliderProperties.maxAttractantAmount) *
        100
      }%`
    );

    state.get("numAttractantPerReceptor") < numAttractantRequiredForDeactivation
      ? activate()
      : deactivate();
  };

  const draw = () => {
    updateActiveState();

    CTX.save();
    CTX.fillStyle = props.get("color");
    CTX.beginPath();
    CTX.arc(
      props.get("position").x + props.get("size") / 2,
      props.get("position").y + props.get("size") / 2,
      props.get("size"),
      0,
      2 * Math.PI
    );
    CTX.closePath();
    CTX.fill();

    updateAttractantPositions();
    CTX.fillStyle = attractantProperties.defaultColor;
    attractantPositions.forEach(({ x, y }) => {
      CTX.beginPath();
      CTX.arc(
        x + attractantProperties.defaultSize / 2,
        y + attractantProperties.defaultSize / 2,
        attractantProperties.defaultSize,
        0,
        2 * Math.PI
      );
      CTX.closePath();
      CTX.fill();
    });
    CTX.restore();
  };

  return { draw, props };
};
