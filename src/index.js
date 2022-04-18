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

  // Store filtered arrays that are used multiple times
  const activeReceptors = entities.receptor.filter((r) => r.active);
  const nonPhosphorylatedCheys = entities.chey.filter((c) => !c.phosphorylated);

  // Update state
  phosphorylatedCheYCount = numCheY - nonPhosphorylatedCheys.length;

  const attractantsOnReceptors = getEntityIntersection(
    entities.attractant,
    activeReceptors
  );

  const cheYsOnReceptors = getEntityIntersection(
    nonPhosphorylatedCheys,
    activeReceptors
  );

  const cheYsOnMotors = getEntityIntersection(
    entities.chey.filter((c) => c.phosphorylated),
    entities.motor
  );

  if (attractantsOnReceptors.length > 0) {
    attractantsOnReceptors.forEach((attractant) => {
      attractant.stick();
    });
  }

  if (cheYsOnReceptors.length > 0) {
    cheYsOnReceptors.forEach((chey) => {
      chey.phosphorylate();
      chey.stick();
    });
  }

  if (cheYsOnMotors.length > 0) {
    cheYsOnMotors.forEach((chey) => {
      chey.dephosphorylate();
      chey.stick();
    });
  }

  Object.entries(entities).forEach(([key, entityType]) =>
    entityType.forEach((entity) => {
      CTX.save();
      entity.draw(CTX);
      CTX.restore();
    })
  );

  window.requestAnimationFrame(drawFrame);
};

const generate = () => {
  const generateArrayOfEntities = (num, object) => {
    return new Array(num).fill().map((_) => new object());
  };

  entities = {
    receptor: generateArrayOfEntities(5, Receptor),
    motor: generateArrayOfEntities(2, Motor),
    attractant: generateArrayOfEntities(10, Attractant),
    chey: generateArrayOfEntities(numCheY, CheY)
  };
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
