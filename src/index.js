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
import {
  canvasProperties,
  cheYSliderProperties,
  attractantSliderProperties
} from "./data.js";

let entities;
let numCheY = cheYSliderProperties.defaultAmount;
let numAttractant = attractantSliderProperties.defaultAmount;
let phosphorylatedCheYCount = 0;
const CTX = generateCanvas(canvasProperties.width, canvasProperties.height);

const drawFrame = () => {
  CTX.clearRect(0, 0, canvasProperties.width, canvasProperties.height);

  // Store filtered arrays that are used multiple times
  const activeReceptors = entities.receptor.filter((r) => r.active);
  const nonPhosphorylatedCheys = entities.chey.filter((c) => !c.phosphorylated);
  const nonStuckAttractant = entities.attractant.filter((a) => !a.isStuck);
  const stuckAttractant = entities.attractant.filter((a) => a.isStuck);

  // Update state
  phosphorylatedCheYCount = numCheY - nonPhosphorylatedCheys.length;

  const nonStuckAttractantsOnAnyReceptors = getEntityIntersection(
    nonStuckAttractant,
    entities.receptor
  );

  const receptorsWithAttractant = getEntityIntersection(
    entities.receptor,
    stuckAttractant
  );

  const nonPhosphorylatedCheysOnActiveReceptors = getEntityIntersection(
    nonPhosphorylatedCheys,
    activeReceptors
  );

  const phosphorylatedCheYsOnMotors = getEntityIntersection(
    entities.chey.filter((c) => c.phosphorylated),
    entities.motor
  );

  if (nonStuckAttractantsOnAnyReceptors.length > 0) {
    nonStuckAttractantsOnAnyReceptors.forEach((attractant) => {
      attractant.stick();
    });
  }

  if (receptorsWithAttractant.length > 0) {
    receptorsWithAttractant.forEach((receptor) => {
      const attractantOnThisReceptor = getEntityIntersection(stuckAttractant, [
        receptor
      ]);

      attractantOnThisReceptor.length > 1
        ? receptor.deactivate()
        : receptor.activate();
    });
  }

  if (nonPhosphorylatedCheysOnActiveReceptors.length > 0) {
    nonPhosphorylatedCheysOnActiveReceptors.forEach((chey) => {
      chey.phosphorylate();
      chey.stick();
    });
  }

  if (phosphorylatedCheYsOnMotors.length > 0) {
    phosphorylatedCheYsOnMotors.forEach((chey) => {
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
    receptor: generateArrayOfEntities(2, Receptor),
    motor: generateArrayOfEntities(1, Motor),
    attractant: generateArrayOfEntities(numAttractant, Attractant),
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
  cheYSliderProperties.maxCheYAmount
);

cheYVolumeSlider.addEventListener("input", ({ target: { value } }) => {
  numCheY = parseInt(value, 10);
  phosphorylatedCheYCount = 0;
  graph.reset();
  generate();
});

const attractantVolumeSlider = generateSlider(
  "Attractant",
  numAttractant,
  attractantSliderProperties.maxAttractantAmount
);

attractantVolumeSlider.addEventListener("input", ({ target: { value } }) => {
  numAttractant = parseInt(value, 10);
  graph.reset();
  generate();
});

generate();
window.requestAnimationFrame(drawFrame);
