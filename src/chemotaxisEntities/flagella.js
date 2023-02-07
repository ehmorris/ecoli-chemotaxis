import {
  mirroredLoopingProgress,
  transition,
  transitionPath,
} from "../animation.js";
import { easeInOutSine } from "../easings.js";

const transitionPathPair = (pathPair, progress, easing) => {
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

export const makeFlagella = (CTX, runData, tumbleData) => {
  const state = new Map()
    .set("activeSet", runData)
    .set("transitionPhase", 0)
    .set("transitionTargetSet", null);

  const tumble = () => {
    if (
      state.get("activeSet") !== tumbleData &&
      state.get("transitionPhase") === 0
    ) {
      state.set("transitionTargetSet", tumbleData).set("transitionPhase", 1);
    }
  };

  const run = () => {
    if (
      state.get("activeSet") !== runData &&
      state.get("transitionPhase") === 0
    ) {
      state.set("transitionTargetSet", runData).set("transitionPhase", 1);
    }
  };

  const draw = (millisecondsElapsed, resetElapsedTime) => {
    CTX.save();
    CTX.lineWidth = 10;
    CTX.lineCap = "round";
    CTX.translate(-100, -300);
    //CTX.rotate((-100 * Math.PI) / 180);
    const transitionDuration = 400;

    if (state.get("transitionPhase") === 1) {
      // Create a new set that captures the current state of the active set as the
      // start of the animation. Set the end state to the beginning of the normal
      // loop that's targeted
      const newActiveSet = {
        from: transitionPathPair(
          state.get("activeSet"),
          mirroredLoopingProgress(
            0,
            state.get("activeSet").animationDuration,
            millisecondsElapsed()
          ),
          easeInOutSine
        ),
        to: {
          path: state.get("transitionTargetSet").from.path,
          position: {
            x: state.get("transitionTargetSet").from.position.x,
            y: state.get("transitionTargetSet").from.position.y,
          },
        },
        animationDuration: transitionDuration,
        lightness: state.get("transitionTargetSet").lightness,
      };

      state.set("activeSet", newActiveSet).set("transitionPhase", 2);
      resetElapsedTime();
    }

    if (
      state.get("transitionPhase") === 2 &&
      millisecondsElapsed() >= transitionDuration
    ) {
      state
        .set("activeSet", state.get("transitionTargetSet"))
        .set("transitionPhase", 0);
      resetElapsedTime();
    }

    const pathAtPoint = transitionPathPair(
      state.get("activeSet"),
      mirroredLoopingProgress(
        0,
        state.get("activeSet").animationDuration,
        millisecondsElapsed()
      ),
      easeInOutSine
    );

    CTX.strokeStyle = `hsl(90, 18%, ${state.get("activeSet").lightness}%)`;
    CTX.translate(pathAtPoint.position.x, pathAtPoint.position.y);
    CTX.stroke(new Path2D(pathAtPoint.path));
    CTX.restore();
  };

  return { draw, tumble, run };
};
