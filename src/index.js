import { CheY } from "./chemotaxisEntities/chey.js";
import { Attractant } from "./chemotaxisEntities/attractant.js";
import { Motor } from "./chemotaxisEntities/motor.js";
import { Receptor } from "./chemotaxisEntities/receptor.js";
import {
  generateCanvas,
  generateSlider,
  getEntityIntersection
} from "./helpers.js";
import { spawnEntityGraph } from "./smallgraph.js";
import { canvasProperties, sliderProperties } from "./data.js";

let entities;
let numCheY = 10;
let phosphorylatedCheYCount = 0;
const CTX = generateCanvas(canvasProperties.width, canvasProperties.height);

const drawFrame = () => {
  CTX.clearRect(0, 0, canvasProperties.width, canvasProperties.height);

  entities.forEach((entity) => {
    CTX.save();

    // Loop through all entities and bucket them for comparison
    const activeReceptors = [];
    const nonPhosphorylatedCheys = [];
    entities.forEach((e) => {
      if (e.type === "receptor" && e.active) {
        activeReceptors.push(e);
      }
      if (e.type === "chey" && !e.phosphorylated) {
        nonPhosphorylatedCheys.push(e);
      }
    });

    // Update state
    phosphorylatedCheYCount = numCheY - nonPhosphorylatedCheys.length;

    const cheYsToPhosphorylate = getEntityIntersection(
      nonPhosphorylatedCheys,
      activeReceptors
    );

    if (cheYsToPhosphorylate.length > 0) {
      cheYsToPhosphorylate.forEach((chey) => chey.makePhosphorylated());
    }

    entity.draw(CTX);
    CTX.restore();
  });

  window.requestAnimationFrame(drawFrame);
};

const generate = () => {
  const generateArrayOfEntities = (num, object) => {
    return new Array(num).fill().map((_) => new object());
  };

  entities = [].concat(
    generateArrayOfEntities(5, Receptor),
    generateArrayOfEntities(2, Motor),
    generateArrayOfEntities(10, Attractant),
    generateArrayOfEntities(numCheY, CheY)
  );
};

const graph = spawnEntityGraph(
  () => phosphorylatedCheYCount,
  () => numCheY,
  "Total cheY",
  "% Phosphorylated"
);

const cheYVolumeSlider = generateSlider(
  "cheY",
  numCheY,
  sliderProperties.maxCheYAmount
);

cheYVolumeSlider.addEventListener("input", ({ target: { value } }) => {
  numCheY = parseInt(value, 10);
  phosphorylatedCheYCount = 0;
  graph.reset();
  generate();
});

generate();
window.requestAnimationFrame(drawFrame);
