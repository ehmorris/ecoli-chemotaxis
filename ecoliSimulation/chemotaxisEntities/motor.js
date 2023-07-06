import { motorProperties } from "../data.js";

export const makeMotor = (CTX) => {
  const props = new Map()
    .set("position", motorProperties.positionsAndRotations.pop())
    .set("type", "motor")
    .set("color", motorProperties.defaultColor)
    .set("size", motorProperties.defaultSize)
    .set("tumbling", false);

  const tumble = () => {
    props.set("color", motorProperties.tumbleColor).set("tumbling", true);
  };

  const run = () => {
    props.set("color", motorProperties.defaultColor).set("tumbling", false);
  };

  const draw = () => {
    const shapeCenter = {
      x: props.get("position").x + props.get("size") / 2,
      y: props.get("position").y + props.get("size") / 2,
    };
    const rotationAmount = (Math.PI / 180) * props.get("position").r;

    CTX.save();
    CTX.fillStyle = props.get("color");
    CTX.translate(shapeCenter.x, shapeCenter.y);
    CTX.rotate(rotationAmount);
    CTX.translate(-props.get("size") / 2, -props.get("size") / 2);
    CTX.fill(new Path2D(motorProperties.shapePath));
    CTX.restore();
  };

  return { draw, tumble, run, props };
};
