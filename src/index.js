import { Ecoli } from "./chemotaxisEntities/ecoli.js";
import { CheY } from "./chemotaxisEntities/chey.js";
import { Attractant } from "./chemotaxisEntities/attractant.js";
import { Motor } from "./chemotaxisEntities/motor.js";
import { Receptor } from "./chemotaxisEntities/receptor.js";
import {
  generateCanvas,
  generateSlider,
  getEntityIntersection,
  isColliding,
  generateArrayOfObjects,
  isShapeInPath,
} from "./helpers.js";
import { spawnEntityGraph } from "./smallgraph.js";
import { spawnTopDown } from "./topdown.js";
import {
  canvasProperties,
  ecoliProperties,
  cheYProperties,
  numCheY,
  receptorProperties,
  motorProperties,
  attractantSliderProperties,
  attractantProperties,
} from "./data.js";

let entities;
const ecoliEntity = new Ecoli();
let numAttractant = attractantSliderProperties.defaultAmount;
let attractantSpawnPosition = null;
let numReceptor = ecoliProperties.numReceptor;
let numMotor = ecoliProperties.numMotor;
let phosphorylatedCheYCount = 0;
let activeMotorCount = 0;
const CTX = generateCanvas({
  width: canvasProperties.width,
  height: canvasProperties.height,
  attachNode: ".canvasContainer",
});

const drawFrame = () => {
  CTX.clearRect(0, 0, canvasProperties.width, canvasProperties.height);

  // Draw background
  ecoliEntity.draw(CTX);

  // Find all intersecting entities
  const acceptsStickyEntities = entities.receptor.concat(entities.motor);
  const entitiesThatStick = entities.chey.concat(entities.attractant);
  const collidingEntitityPairs = [];
  const collidingEntitiesFlat = [];
  for (const acceptsSticky of acceptsStickyEntities) {
    for (const sticky of entitiesThatStick) {
      if (
        isColliding(
          acceptsSticky.position,
          acceptsSticky.size,
          sticky.position,
          sticky.size
        )
      ) {
        collidingEntitityPairs.push({
          entity: sticky,
          collidingWith: acceptsSticky,
        });
        collidingEntitiesFlat.push(acceptsSticky);
      }
    }
  }

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
      entity.stick(collidingWith);
    }

    // Stick phosphorylated cheY to colliding motors
    if (
      entity.type === "chey" &&
      entity.phosphorylated &&
      collidingWith.type === "motor"
    ) {
      entity.dephosphorylate();
      entity.stick(collidingWith);
    }
  });

  // Toggle receptor state based on how much attractant is on it
  collidingEntitiesFlat
    .filter(({ type }) => type === "receptor")
    .forEach((receptor) => {
      const attractantOnThisReceptor = getEntityIntersection(
        collidingEntitiesFlat.filter(
          (e) => e.type === "attractant" && e.isStuck
        ),
        [receptor]
      );

      attractantOnThisReceptor.length >=
      receptorProperties.attractantRequiredToDeactivate
        ? receptor.deactivate()
        : receptor.activate();
    });

  // Toggle motor state based on how much cheY is on it
  collidingEntitiesFlat
    .filter(({ type }) => type === "motor")
    .forEach((motor) => {
      const cheYOnThisMotor = getEntityIntersection(
        collidingEntitiesFlat.filter((e) => e.type === "chey" && e.isStuck),
        [motor]
      );

      cheYOnThisMotor.length >= motorProperties.cheYRequiredToTumble
        ? motor.tumble()
        : motor.run();
    });

  // Update for phosphorylated timeseries
  phosphorylatedCheYCount =
    numCheY - entities.chey.filter((c) => !c.phosphorylated).length;

  // Update for tumble/run viz
  activeMotorCount = entities.motor.filter((m) => m.tumbling).length;

  // Draw scene
  Object.entries(entities).forEach(([key, entityType]) =>
    entityType.forEach((entity) => {
      CTX.save();
      entity.draw(CTX);
      CTX.restore();
    })
  );

  window.requestAnimationFrame(drawFrame);
};

const appendEntities = () => {
  const unionArrays = (arr1, arr2) => [...new Set([...arr1, ...arr2])];
  const numNewReceptors = numReceptor - entities.receptor.length;
  const numNewMotors = numMotor - entities.motor.length;
  const numNewAttractant = numAttractant - entities.attractant.length;
  const numNewCheY = numCheY - entities.chey.length;

  if (numNewReceptors >= 0) {
    entities.receptor = unionArrays(
      entities.receptor,
      generateArrayOfObjects(numNewReceptors, Receptor)
    );
  } else {
    entities.receptor.splice(numNewReceptors);
  }

  if (numNewMotors >= 0) {
    entities.motor = unionArrays(
      entities.motor,
      generateArrayOfObjects(numNewMotors, Motor)
    );
  } else {
    entities.motor.splice(numNewMotors);
  }

  if (numNewAttractant >= 0) {
    entities.attractant = unionArrays(
      entities.attractant,
      new Array(numNewAttractant)
        .fill()
        .map((_) => new Attractant(attractantSpawnPosition))
    );
  } else {
    entities.attractant.splice(numNewAttractant);
  }

  if (numNewCheY >= 0) {
    entities.chey = unionArrays(
      entities.chey,
      generateArrayOfObjects(numNewCheY, CheY)
    );
  } else {
    entities.chey.splice(numNewCheY);
  }
};

const generateEntities = () => {
  entities = {
    receptor: generateArrayOfObjects(numReceptor, Receptor),
    motor: generateArrayOfObjects(numMotor, Motor),
    attractant: generateArrayOfObjects(numAttractant, Attractant),
    chey: generateArrayOfObjects(numCheY, CheY),
  };
};

const attractantVolumeSlider = generateSlider({
  label: "Attractant",
  value: numAttractant,
  max: attractantSliderProperties.maxAttractantAmount,
  min: 1,
  attachNode: ".sliderContainer",
});

spawnEntityGraph({
  getNumerator: () => phosphorylatedCheYCount,
  getDenominator: () => numCheY,
  topLabel: "Total cheY",
  bottomLabel: "Phosphory...",
  showPercent: true,
  backgroundColor: cheYProperties.defaultColor,
  fillColor: cheYProperties.phosphorylatedColor,
});

spawnTopDown({
  getNumerator: () => activeMotorCount,
  getDenominator: () => numMotor,
});

attractantVolumeSlider.addEventListener("input", ({ target: { value } }) => {
  numAttractant = parseInt(value, 10);
  appendEntities();
});

CTX.canvas.addEventListener("click", ({ layerX: x, layerY: y }) => {
  numAttractant = numAttractant + 30;

  if (
    !isShapeInPath(
      CTX,
      new Path2D(ecoliProperties.boundaryPath),
      ecoliProperties.boundaryLeft,
      ecoliProperties.boundaryTop,
      { x, y },
      attractantProperties.defaultSize
    )
  ) {
    attractantSpawnPosition = { x, y };
  }

  attractantVolumeSlider.value = numAttractant;
  appendEntities();
});

// Kick off simulation
generateEntities();
window.requestAnimationFrame(drawFrame);
