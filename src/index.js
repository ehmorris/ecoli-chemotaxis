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
  cheYProperties,
  receptorProperties,
  motorProperties,
  attractantSliderProperties
} from "./data.js";

let entities;
let numCheY = cheYSliderProperties.defaultAmount;
let numAttractant = attractantSliderProperties.defaultAmount;
let numReceptor = 2;
let numMotor = 3;
let phosphorylatedCheYCount = 0;
let activeMotorCount = 0;
const CTX = generateCanvas({
  width: canvasProperties.width,
  height: canvasProperties.height,
  attachNode: ".canvasContainer"
});

const drawFrame = () => {
  CTX.clearRect(0, 0, canvasProperties.width, canvasProperties.height);

  // Find all intersecting entities
  const flattenedEntities = Object.values(entities).flat();
  const collidingEntitityPairs = [];
  const collidingEntitiesFlat = [];
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
        collidingEntitiesFlat.push(entity1);
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

  // Update for tumble/run timeseries
  activeMotorCount = entities.motor.filter((m) => m.tumbling).length;

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
  const generateArrayOfEntities = (num, object) => {
    return new Array(num).fill().map((_) => new object());
  };

  const numExistingReceptors = entities.receptor.length;
  const numExistingMotors = entities.motor.length;
  const numExistingAttractant = entities.attractant.length;
  const numExistingCheY = entities.chey.length;

  const numNewReceptors = numReceptor - numExistingReceptors;
  const numNewMotors = numMotor - numExistingMotors;
  const numNewAttractant = numAttractant - numExistingAttractant;
  const numNewCheY = numCheY - numExistingCheY;

  let newReceptorArray;
  let newMotorArray;
  let newAttractantArray;
  let newCheYArray;

  if (numNewReceptors >= 0) {
    const newReceptors = generateArrayOfEntities(numNewReceptors, Receptor);
    newReceptorArray = [...new Set([...entities.receptor, ...newReceptors])];
  } else {
    entities.receptor.splice(numNewReceptors);
    newReceptorArray = entities.receptor;
  }

  if (numNewMotors >= 0) {
    const newMotors = generateArrayOfEntities(numNewMotors, Motor);
    newMotorArray = [...new Set([...entities.motor, ...newMotors])];
  } else {
    entities.motor.splice(numNewMotors);
    newMotorArray = entities.motor;
  }

  if (numNewAttractant >= 0) {
    const newAttractant = generateArrayOfEntities(numNewAttractant, Attractant);
    newAttractantArray = [
      ...new Set([...entities.attractant, ...newAttractant])
    ];
  } else {
    entities.attractant.splice(numNewAttractant);
    newAttractantArray = entities.attractant;
  }

  if (numNewCheY >= 0) {
    const newCheY = generateArrayOfEntities(numNewCheY, CheY);
    newCheYArray = [...new Set([...entities.chey, ...newCheY])];
  } else {
    entities.chey.splice(numNewCheY);
    newCheYArray = entities.chey;
  }

  entities = {
    receptor: newReceptorArray,
    motor: newMotorArray,
    attractant: newAttractantArray,
    chey: newCheYArray
  };
};

const generateEntities = () => {
  const generateArrayOfEntities = (num, object) => {
    return new Array(num).fill().map((_) => new object());
  };

  entities = {
    receptor: generateArrayOfEntities(numReceptor, Receptor),
    motor: generateArrayOfEntities(numMotor, Motor),
    attractant: generateArrayOfEntities(numAttractant, Attractant),
    chey: generateArrayOfEntities(numCheY, CheY)
  };
};

const cheYVolumeSlider = generateSlider({
  label: "cheY",
  value: numCheY,
  max: cheYSliderProperties.maxCheYAmount,
  min: 1,
  attachNode: ".sliderContainer"
});

const attractantVolumeSlider = generateSlider({
  label: "Attractant",
  value: numAttractant,
  max: attractantSliderProperties.maxAttractantAmount,
  min: 1,
  attachNode: ".sliderContainer"
});

spawnEntityGraph({
  getNumerator: () => phosphorylatedCheYCount,
  getDenominator: () => numCheY,
  topLabel: "Total cheY",
  bottomLabel: "% Phosphorylated",
  showPercent: true,
  backgroundColor: cheYProperties.defaultColor,
  fillColor: cheYProperties.phosphorylatedColor
});

spawnEntityGraph({
  getNumerator: () => activeMotorCount,
  getDenominator: () => numMotor,
  topLabel: "Tumble",
  bottomLabel: "Run",
  showPercent: false,
  backgroundColor: motorProperties.defaultColor,
  fillColor: motorProperties.tumbleColor
});

cheYVolumeSlider.addEventListener("input", ({ target: { value } }) => {
  numCheY = parseInt(value, 10);
  //phosphorylatedCheYCount = 0;
  appendEntities();
});

attractantVolumeSlider.addEventListener("input", ({ target: { value } }) => {
  numAttractant = parseInt(value, 10);
  appendEntities();
});

// Kick off simulation
generateEntities();
window.requestAnimationFrame(drawFrame);
