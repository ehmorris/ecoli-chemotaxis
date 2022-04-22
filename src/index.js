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
  receptorProperties,
  motorProperties,
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
  const nonPhosphorylatedCheys = entities.chey.filter((c) => !c.phosphorylated);

  // Update value for small time series graph
  phosphorylatedCheYCount = numCheY - nonPhosphorylatedCheys.length;

  // Stick attractant onto any colliding receptor
  getEntityIntersection(
    entities.attractant.filter((a) => !a.isStuck),
    entities.receptor
  ).forEach((attractant) => {
    attractant.stick();
  });

  // Toggle receptor state based on how much attractant is on it
  const stuckAttractant = entities.attractant.filter((a) => a.isStuck);
  getEntityIntersection(entities.receptor, stuckAttractant).forEach(
    (receptor) => {
      const attractantOnThisReceptor = getEntityIntersection(stuckAttractant, [
        receptor
      ]);

      attractantOnThisReceptor.length >=
      receptorProperties.attractantRequiredToDeactivate
        ? receptor.deactivate()
        : receptor.activate();
    }
  );

  // Toggle motor state based on how much cheY is on it
  const stuckCheY = entities.chey.filter((c) => c.isStuck);
  getEntityIntersection(entities.motor, stuckCheY).forEach((motor) => {
    const attractantOnThisMotor = getEntityIntersection(stuckCheY, [motor]);

    attractantOnThisMotor.length >= motorProperties.cheYRequiredToTumble
      ? motor.tumble()
      : motor.run();
  });

  // Stick non-phosphorylated cheY to colliding receptors
  getEntityIntersection(
    nonPhosphorylatedCheys,
    entities.receptor.filter((r) => r.active)
  ).forEach((chey) => {
    chey.phosphorylate();
    chey.stick();
  });

  // Stick phosphorylated cheY to colliding motors
  getEntityIntersection(
    entities.chey.filter((c) => c.phosphorylated),
    entities.motor
  ).forEach((chey) => {
    chey.dephosphorylate();
    chey.stick();
  });

  Object.entries(entities).forEach(([key, entityType]) =>
    entityType.forEach((entity) => {
      CTX.save();
      entity.draw(CTX);
      CTX.restore();
    })
  );

  window.requestAnimationFrame(drawFrame);
};

const generateEntities = () => {
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
  generateEntities();
});

const attractantVolumeSlider = generateSlider(
  "Attractant",
  numAttractant,
  attractantSliderProperties.maxAttractantAmount
);

attractantVolumeSlider.addEventListener("input", ({ target: { value } }) => {
  numAttractant = parseInt(value, 10);
  graph.reset();
  generateEntities();
});

generateEntities();
window.requestAnimationFrame(drawFrame);
