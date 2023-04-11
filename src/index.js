import { drawEcoli } from "./chemotaxisEntities/ecoli.js";
import { makeCheY } from "./chemotaxisEntities/chey.js";
import { makeMotor } from "./chemotaxisEntities/motor.js";
import { makeReceptor } from "./chemotaxisEntities/receptor.js";
import { makeFlagella } from "./chemotaxisEntities/flagella.js";
import {
  generateCanvas,
  generateSlider,
  getEntityIntersection,
  isColliding,
  generateArrayOfX,
  isShapeInPath,
} from "./helpers.js";
import { animate } from "./animation.js";
import { generateEntityTimeseries } from "./smallgraph.js";
import { generateTopDownViz } from "./topdownviz.js";
import {
  canvasProperties,
  ecoliProperties,
  cheYProperties,
  motorProperties,
  attractantSliderProperties,
} from "./data.js";

const CTX = generateCanvas({
  width: canvasProperties.width,
  height: canvasProperties.height,
  attachNode: ".canvasContainer",
});

const state = new Map()
  .set("numAttractantPerReceptor", attractantSliderProperties.defaultAmount)
  .set("timeAttractantLastIncreased", Date.now())
  .set("attractantRequiredToDeactivate", 2)
  .set("phosphorylatedCheYCount", 0)
  .set("activeMotorCount", 0);

const receptors = generateArrayOfX(ecoliProperties.numReceptor, () =>
  makeReceptor(CTX, state)
);
const motors = generateArrayOfX(ecoliProperties.numMotor, () => makeMotor(CTX));
const chey = generateArrayOfX(ecoliProperties.numCheY, () => makeCheY(CTX));
const flagella = makeFlagella(CTX);

animate((millisecondsElapsed, resetElapsedTime) => {
  CTX.clearRect(0, 0, canvasProperties.width, canvasProperties.height);

  // Find all intersecting entities
  const acceptsStickyEntities = receptors.concat(motors);
  const entitiesThatStick = chey;
  const collidingEntitityPairs = [];
  const collidingEntitiesFlat = [];
  for (const acceptsSticky of acceptsStickyEntities) {
    for (const sticky of entitiesThatStick) {
      if (
        isColliding(
          acceptsSticky.props.get("position"),
          acceptsSticky.props.get("size"),
          sticky.props.get("position"),
          sticky.props.get("size")
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
    // Stick non-phosphorylated cheY to colliding receptors
    if (
      entity.props.get("type") === "chey" &&
      !entity.props.get("phosphorylated") &&
      collidingWith.props.get("type") === "receptor" &&
      collidingWith.props.get("active")
    ) {
      entity.phosphorylate();
      entity.stick(collidingWith);
    }

    // Stick phosphorylated cheY to colliding motors
    if (
      entity.props.get("type") === "chey" &&
      entity.props.get("phosphorylated") &&
      collidingWith.props.get("type") === "motor"
    ) {
      entity.dephosphorylate();
      entity.stick(collidingWith);
    }
  });

  // Toggle receptor state based on how much attractant is on it
  if (Date.now() - state.get("timeAttractantLastIncreased") > 1_000) {
    state.set(
      "attractantRequiredToDeactivate",
      state.get("numAttractantPerReceptor")
    );
  }
  collidingEntitiesFlat
    .filter(({ props }) => props.get("type") === "receptor")
    .forEach((receptor) => {
      state.get("numAttractantPerReceptor") >=
      state.get("attractantRequiredToDeactivate")
        ? receptor.deactivate()
        : receptor.activate();
    });

  // Toggle motor state based on how much cheY is on it
  collidingEntitiesFlat
    .filter(({ props }) => props.get("type") === "motor")
    .forEach((motor) => {
      const cheYOnThisMotor = getEntityIntersection(
        collidingEntitiesFlat.filter(
          ({ props }) => props.get("type") === "chey" && props.get("isStuck")
        ),
        [motor]
      );

      cheYOnThisMotor.length >= motorProperties.cheYRequiredToTumble
        ? motor.tumble()
        : motor.run();
    });

  // Update for phosphorylated timeseries
  state.set(
    "phosphorylatedCheYCount",
    ecoliProperties.numCheY -
      chey.filter((c) => !c.props.get("phosphorylated")).length
  );

  // Update for tumble/run viz
  state.set(
    "activeMotorCount",
    motors.filter((m) => m.props.get("tumbling")).length
  );

  // Toggle flagella animation based on majority motor state
  state.get("activeMotorCount") > ecoliProperties.numMotor - 1
    ? flagella.tumble()
    : flagella.run();

  flagella.draw(millisecondsElapsed, resetElapsedTime);
  drawEcoli(CTX);
  receptors.forEach((r) => r.draw());
  motors.forEach((m) => m.draw());
  chey.forEach((c) => c.draw());
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
  denominator: ecoliProperties.numMotor,
});

generateSlider({
  label: "Attractant",
  value: state.get("numAttractantPerReceptor"),
  max: attractantSliderProperties.maxAttractantAmount,
  min: 0,
  attachNode: ".sliderContainer",
  onInput: (value) => {
    const newValue = parseInt(value, 10);
    state.set("numAttractantPerReceptor", newValue);

    if (newValue > state.get("numAttractantPerReceptor")) {
      state.set("timeAttractantLastIncreased", Date.now());
    }
  },
});
