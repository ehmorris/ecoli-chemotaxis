import { receptorProperties } from "../data.js";

export const makeReceptor = (CTX) => {
  const props = new Map()
    .set("position", receptorProperties.positions.pop())
    .set("type", "receptor")
    .set("color", receptorProperties.activeColor)
    .set("size", receptorProperties.defaultSize)
    .set("active", true);

  const activate = () => {
    props.set("active", true).set("color", receptorProperties.activeColor);
  };

  const deactivate = () => {
    props.set("active", false).set("color", receptorProperties.defaultColor);
  };

  const draw = () => {
    CTX.fillStyle = props.get("color");
    CTX.fillRect(
      props.get("position").x,
      props.get("position").y,
      props.get("size"),
      props.get("size")
    );
  };

  return { activate, deactivate, draw, props };
};
