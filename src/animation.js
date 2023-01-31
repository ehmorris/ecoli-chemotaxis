// Progress
// Transforms any number range into a range of 0–1
//
// Expected behavior:
// progress(5, 30, 17.5) -> .5
// progress(30, 5, 17.5) -> .5
// progress(5, 30, 30)   -> 1
const progress = (start, end, current) => (current - start) / (end - start);

const loopingProgress = (start, end, current) =>
  progress(start, end, current) % 1;

export const mirroredLoopingProgress = (start, end, current) => {
  const progress = loopingProgress(start, end, current);
  return Math.floor(current / end) % 2 ? Math.abs(progress - 1) : progress;
};

// Transition
// Transforms a range of 0–1 into any number range
//
// Expected behavior:
// transition(5, 30, .5) -> 17.5
// transition(30, 5, .5) -> 17.5
// transition(5, 30, 1)  -> 30
// transition(30, 5, 1)  -> 5
// transition(5, 30, 0)  -> 5
// transition(30, 5, 0)  -> 30
export const transition = (start, end, progress, easingFunc) => {
  const easedProgress = easingFunc ? easingFunc(progress) : progress;
  return start + Math.sign(end - start) * Math.abs(end - start) * easedProgress;
};

// Path to array
//
// Expected behavior:
// splitPathIntoArray("M364.5 8.00009C343.5 0.166-754 297")
//   -> ["M", 364.5, 8.0009, "C", 343.5, 0.166, -754, 297]
const splitPathIntoArray = (pathString) =>
  pathString
    .match(/[a-zA-Z]+|[0-9-.]+/g)
    .map((n) => (parseFloat(n) ? parseFloat(n) : n));

// Transition path
// Applies a transition to all vertices in a path
// This will only work on two paths that have the same number of vertices
//
// Expected behavior:
// transitionPath("M10 20 40", "M20 40 80", .5) -> "M 15 30 60"
export const transitionPath = (pathStart, pathEnd, progress, easingFunc) => {
  const startParts = splitPathIntoArray(pathStart);
  const endParts = splitPathIntoArray(pathEnd);
  let tweenParts = [];

  startParts.forEach((startPart, index) => {
    if (typeof startPart === "number") {
      tweenParts.push(
        transition(startPart, endParts[index], progress, easingFunc)
      );
    } else {
      tweenParts.push(startPart);
    }
  });

  return tweenParts.join(" ");
};

export const animate = (drawFunc) => {
  let startTime = Date.now();
  const getTimeElapsed = () => Date.now() - startTime;
  const resetStartTime = () => (startTime = Date.now());

  const drawFuncContainer = () => {
    drawFunc(getTimeElapsed, resetStartTime);
    window.requestAnimationFrame(drawFuncContainer);
  };

  window.requestAnimationFrame(drawFuncContainer);
};
