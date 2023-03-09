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
  const _state = new Map()
    .set("activeSet", runData)
    .set("transitionPhase", 0)
    .set("transitionTargetSet", null);

  const tumble = () => {
    if (
      _state.get("activeSet") !== tumbleData &&
      _state.get("transitionPhase") === 0
    ) {
      _state.set("transitionTargetSet", tumbleData).set("transitionPhase", 1);
    }
  };

  const run = () => {
    if (
      _state.get("activeSet") !== runData &&
      _state.get("transitionPhase") === 0
    ) {
      _state.set("transitionTargetSet", runData).set("transitionPhase", 1);
    }
  };

  const draw = (millisecondsElapsed, resetElapsedTime) => {
    CTX.save();
    CTX.lineWidth = 10;
    CTX.lineCap = "round";
    const transitionDuration = 400;

    if (_state.get("transitionPhase") === 1) {
      // Create a new set that captures the current state of the active set as the
      // start of the animation. Set the end state to the beginning of the normal
      // loop that's targeted
      const newActiveSet = {
        from: transitionPathPair(
          _state.get("activeSet"),
          mirroredLoopingProgress(
            0,
            _state.get("activeSet").animationDuration,
            millisecondsElapsed()
          ),
          easeInOutSine
        ),
        to: {
          path: _state.get("transitionTargetSet").from.path,
          position: {
            x: _state.get("transitionTargetSet").from.position.x,
            y: _state.get("transitionTargetSet").from.position.y,
          },
        },
        animationDuration: transitionDuration,
        lightness: _state.get("transitionTargetSet").lightness,
      };

      _state.set("activeSet", newActiveSet).set("transitionPhase", 2);
      resetElapsedTime();
    }

    if (
      _state.get("transitionPhase") === 2 &&
      millisecondsElapsed() >= transitionDuration
    ) {
      _state
        .set("activeSet", _state.get("transitionTargetSet"))
        .set("transitionPhase", 0);
      resetElapsedTime();
    }

    const pathAtPoint = transitionPathPair(
      _state.get("activeSet"),
      mirroredLoopingProgress(
        0,
        _state.get("activeSet").animationDuration,
        millisecondsElapsed()
      ),
      easeInOutSine
    );

    CTX.strokeStyle = `hsl(90, 18%, ${_state.get("activeSet").lightness}%)`;
    CTX.translate(pathAtPoint.position.x, pathAtPoint.position.y);
    CTX.stroke(new Path2D(pathAtPoint.path));
    CTX.restore();
  };

  return { draw, tumble, run };
};
