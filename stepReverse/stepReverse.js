let reversed = false;
let index = 0;

const nextFrame = () => {
  const imageSrc = `./articleImages/rotor/${
    reversed ? "reversed/" : ""
  }rotor-${index}.png`;
  document.querySelector("#stepReverse-image").setAttribute("src", imageSrc);
};

const flipFrame = () => {
  console.log("flip", "index", index);
  const imageSrc = `./articleImages/rotor/${
    reversed ? "reversed/" : ""
  }rotor-${index}.png`;
  document.querySelector("#stepReverse-image").setAttribute("src", imageSrc);
};

document.querySelector("#stepReverse-step").addEventListener("click", () => {
  if (reversed) {
    index -= 1;
    if (index < 0) index = 33;
  } else {
    index += 1;
    if (index > 33) index = 0;
  }

  nextFrame();
});

document.querySelector("#stepReverse-reverse").addEventListener("click", () => {
  reversed = !reversed;
  flipFrame();
});
