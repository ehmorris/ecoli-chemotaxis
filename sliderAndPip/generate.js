import { generateCanvas } from "../ecoliSimulation/helpers.js";

export const generateSlider = ({ value, max, min, attachNode, onInput }) => {
  const attachNodeElement = document.querySelector(attachNode);
  const width = attachNodeElement.clientWidth;
  const height = attachNodeElement.clientHeight;

  const [CTX, element] = generateCanvas({
    width,
    height,
    attachNode,
  });

  // TODO
  // Listen for mouse events
  // Render pip in an animation frame loop
  // Get interfaces below working properly
  // Move common files like helpers and animation to top level

  element.addEventListener("mousedown", ({ clientX }) => {
    const value = (clientX / width) * 100;
    onInput(value);
  });

  const setValue = (value) => {};

  return { setValue };
};
