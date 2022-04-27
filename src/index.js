import { CheY } from "./chemotaxisEntities/chey.js";
import { Attractant } from "./chemotaxisEntities/attractant.js";
import { Motor } from "./chemotaxisEntities/motor.js";
import { Receptor } from "./chemotaxisEntities/receptor.js";
import {
  generateCanvas,
  generateSlider,
  getEntityIntersection,
  isColliding
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

  // Find all intersecting entities
  const flattenedEntities = Object.values(entities).flat();
  const collidingEntitityPairs = [];
  flattenedEntities.forEach((entity1) => {
    flattenedEntities.forEach((entity2) => {
      if (
        entity1.id !== entity2.id &&
        isColliding(
          entity1.position,
          entity1.size,
          entity2.position,
          entity2.size
        )
      ) {
        collidingEntitityPairs.push({
          entity: entity1,
          collidingWith: entity2
        });
      }
    });
  });

  // Trigger collision behavior in colliding entities
  collidingEntitityPairs.forEach(({ entity, collidingWith }) => {
    // Stick attractant onto any colliding receptor
    if (
      entity.type === "attractant" &&
      !entity.isStuck &&
      collidingWith.type === "receptor"
    ) {
      entity.stick();
    }

    // Stick non-phosphorylated cheY to colliding receptors
    if (
      entity.type === "chey" &&
      !entity.phosphorylated &&
      collidingWith.type === "receptor" &&
      collidingWith.active
    ) {
      entity.phosphorylate();
      entity.stick();
    }

    // Stick phosphorylated cheY to colliding motors
    if (
      entity.type === "chey" &&
      entity.phosphorylated &&
      collidingWith.type === "motor"
    ) {
      entity.dephosphorylate();
      entity.stick();
    }
  });

  // Toggle receptor state based on how much attractant is on it
  const collidingEntities = collidingEntitityPairs.map(({ entity }) => entity);

  collidingEntities
    .filter(({ type }) => type === "receptor")
    .forEach((receptor) => {
      const attractantOnThisReceptor = getEntityIntersection(
        collidingEntities.filter((e) => e.type === "attractant" && e.isStuck),
        [receptor]
      );

      attractantOnThisReceptor.length >=
      receptorProperties.attractantRequiredToDeactivate
        ? receptor.deactivate()
        : receptor.activate();
    });

  // Toggle motor state based on how much cheY is on it
  collidingEntities
    .filter(({ type }) => type === "motor")
    .forEach((motor) => {
      const cheYOnThisMotor = getEntityIntersection(
        collidingEntities.filter((e) => e.type === "chey" && e.isStuck),
        [motor]
      );

      cheYOnThisMotor.length >= motorProperties.cheYRequiredToTumble
        ? motor.tumble()
        : motor.run();
    });

  // Update value for small time series graph
  phosphorylatedCheYCount =
    numCheY - entities.chey.filter((c) => !c.phosphorylated).length;

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
