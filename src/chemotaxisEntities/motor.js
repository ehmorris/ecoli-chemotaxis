import { motorProperties } from "../data.js";
import { makeFlagella } from "./flagella.js";

export const makeMotor = (CTX) => {
  const data = motorProperties.data.pop();
  const flagella = makeFlagella(CTX, data.flagella.run, data.flagella.tumble);
  const props = new Map()
    .set("position", data.position)
    .set("rotation", data.rotation)
    .set("type", "motor")
    .set("color", motorProperties.defaultColor)
    .set("size", motorProperties.defaultSize)
    .set("tumbling", false);

  const tumble = () => {
    props.set("color", motorProperties.tumbleColor).set("tumbling", true);
    flagella.tumble();
  };

  const run = () => {
    props.set("color", motorProperties.defaultColor).set("tumbling", false);
    flagella.run();
  };

  const draw = (millisecondsElapsed, resetElapsedTime) => {
    const shapeCenter = {
      x: props.get("position").x + props.get("size") / 2,
      y: props.get("position").y + props.get("size") / 2,
    };
    const rotationAmount = (Math.PI / 180) * props.get("rotation");

    CTX.save();
    CTX.fillStyle = props.get("color");
    CTX.strokeStyle = "#010103";
    CTX.translate(shapeCenter.x, shapeCenter.y);
    CTX.rotate(rotationAmount);
    CTX.translate(-props.get("size") / 2, -props.get("size") / 2);
    CTX.fill(new Path2D(motorProperties.shapePath));
    CTX.stroke(new Path2D(motorProperties.shapePath));
    flagella.draw(millisecondsElapsed, resetElapsedTime);
    CTX.restore();
  };

  return { draw, tumble, run, props };
};
