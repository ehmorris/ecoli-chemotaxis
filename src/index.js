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
  clampNumber,
} from "./helpers.js";
import { animate } from "./animation.js";
import { generateTopDownViz } from "./topdownviz.js";
import {
  canvasProperties,
  ecoliProperties,
  motorProperties,
  attractantSliderProperties,
} from "./data.js";
import { transition, progress } from "./animation.js";
import { easeInExpo } from "./easings.js";

const CTX = generateCanvas({
  width: canvasProperties.width,
  height: canvasProperties.height,
  attachNode: ".heroCanvasContainer",
});

const state = new Map()
  .set("numAttractantPerReceptor", attractantSliderProperties.defaultAmount)
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

  // Update for tumble/run viz
  state.set(
    "activeMotorCount",
    motors.filter((m) => m.props.get("tumbling")).length
  );

  // Decrease num attractant constantly
  eatAttractant();

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

generateTopDownViz({
  getNumerator: () => state.get("activeMotorCount"),
  denominator: ecoliProperties.numMotor,
});

let sliderLastChanged = Date.now();

const slider = generateSlider({
  value: state.get("numAttractantPerReceptor"),
  max: attractantSliderProperties.maxAttractantAmount,
  min: 0,
  attachNode: ".sliderContainer",
  onInput: (value) => {
    const newValue = parseInt(value, 10);
    state.set("numAttractantPerReceptor", newValue);
    sliderLastChanged = Date.now();
  },
});

function eatAttractant() {
  const newNum = clampNumber(
    transition(
      state.get("numAttractantPerReceptor"),
      attractantSliderProperties.defaultAmount,
      progress(sliderLastChanged, sliderLastChanged + 15_000, Date.now()),
      easeInExpo
    ),
    attractantSliderProperties.defaultAmount,
    attractantSliderProperties.maxAttractantAmount
  );

  state.set("numAttractantPerReceptor", newNum);
  slider.value = state.get("numAttractantPerReceptor");
}
