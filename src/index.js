import { drawEcoli } from "./chemotaxisEntities/ecoli.js";
import { CheY } from "./chemotaxisEntities/chey.js";
import { Attractant } from "./chemotaxisEntities/attractant.js";
import { Motor } from "./chemotaxisEntities/motor.js";
import { Receptor } from "./chemotaxisEntities/receptor.js";
import { flagella } from "./chemotaxisEntities/flagella.js";
import {
  generateCanvas,
  generateSlider,
  getEntityIntersection,
  isColliding,
  generateArrayOfObjects,
  isShapeInPath,
} from "./helpers.js";
import { animate } from "./animation.js";
import { generateEntityTimeseries } from "./smallgraph.js";
import { generateTopDownViz } from "./topdown.js";
import {
  canvasProperties,
  ecoliProperties,
  cheYProperties,
  receptorProperties,
  motorProperties,
  attractantSliderProperties,
  attractantProperties,
} from "./data.js";

const CTX = generateCanvas({
  width: canvasProperties.width,
  height: canvasProperties.height,
  attachNode: ".canvasContainer",
});

const state = new Map()
  .set("numAttractant", attractantSliderProperties.defaultAmount)
  .set("phosphorylatedCheYCount", 0)
  .set("activeMotorCount", 0);

const receptors = generateArrayOfObjects(ecoliProperties.numReceptor, Receptor);
const motors = generateArrayOfObjects(ecoliProperties.numMotor, Motor);
const chey = generateArrayOfObjects(ecoliProperties.numCheY, CheY);
const flagellaInstance = flagella();
let attractant = generateArrayOfObjects(state.get("numAttractant"), Attractant);

const attractantVolumeSlider = generateSlider({
  label: "Attractant",
  value: state.get("numAttractant"),
  max: attractantSliderProperties.maxAttractantAmount,
  min: 1,
  attachNode: ".sliderContainer",
  onInput: (value) => {
    state.set("numAttractant", parseInt(value, 10));
    const numNewAttractant = state.get("numAttractant") - attractant.length;

    if (numNewAttractant >= 0) {
      attractant = attractant.concat(
        generateArrayOfObjects(numNewAttractant, Attractant)
      );
    } else {
      attractant.splice(numNewAttractant);
    }
  },
});

CTX.canvas.addEventListener("click", ({ layerX: x, layerY: y }) => {
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
    const numNewAttractant = 30;
    state.set("numAttractant", state.get("numAttractant") + numNewAttractant);
    attractantVolumeSlider.value = state.get("numAttractant");
    attractant = attractant.concat(
      new Array(numNewAttractant).fill().map((_) => new Attractant({ x, y }))
    );
  }
});

animate((millisecondsElapsed, resetElapsedTime) => {
  CTX.clearRect(0, 0, canvasProperties.width, canvasProperties.height);

  // Find all intersecting entities
  const acceptsStickyEntities = receptors.concat(motors);
  const entitiesThatStick = chey.concat(attractant);
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
        collidingEntitiesFlat.push(sticky);
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
  state.set(
    "phosphorylatedCheYCount",
    ecoliProperties.numCheY - chey.filter((c) => !c.phosphorylated).length
  );

  // Update for tumble/run viz
  state.set("activeMotorCount", motors.filter((m) => m.tumbling).length);

  state.get("activeMotorCount") / ecoliProperties.numMotor > 0.5
    ? flagellaInstance.tumble()
    : flagellaInstance.run();

  // Draw scene
  attractant.forEach((a) => a.draw(CTX));
  Promise.all(attractant).then(() => {
    flagellaInstance.draw(CTX, millisecondsElapsed, resetElapsedTime);
    drawEcoli(CTX);
    receptors.forEach((r) => r.draw(CTX));
    motors.forEach((m) => m.draw(CTX));
    chey.forEach((c) => c.draw(CTX));
  });
});

generateEntityTimeseries({
  getNumerator: () => state.get("phosphorylatedCheYCount"),
  denominator: ecoliProperties.numCheY,
  topLabel: "Total cheY",
  bottomLabel: "Phosphory...",
  showPercent: true,
  backgroundColor: cheYProperties.defaultColor,
  fillColor: cheYProperties.phosphorylatedColor,
});

generateTopDownViz({
  getNumerator: () => state.get("activeMotorCount"),
  getDenominator: () => ecoliProperties.numMotor,
});
