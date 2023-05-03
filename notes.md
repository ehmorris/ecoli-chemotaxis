# Notes 5/3/23

- Red line pip should be decaying to the left and so should the black circle (attractant eaten)
  - What are the rates? Whatever feels good
- Fix cheY dephosphralation
- Colors for activation/deactivation should look like more obvious highlights
  - Activate things when hovering over key words in text

# Notes 3/23/23

- [x] Add methylation: receptors become less sensitive to attractant the more it has
  - As you move slider up, attractant required to deactivate receptor should go up
  - But this decays over time, so after N seconds, the amount required to deactivate goes down
  - Attractant also being removed by receptor object (eaten, expired)
- [ ] Make slider reactive to amount of attractant when it's decreased by automation

- [x] Make cheY dephosphoralte after N seconds

- [ ] Find sweet spot for cheY speed and number, think about amking their motion inclined towards the motors when phosphoralated

- [ ] Colors for activation/deactivation should look like more obvious highlights

# Notes 1/3/23

- [x] Change attractant. This illustration is about the internal dynamics. Instead of attractant rendering in a moving field, just render them onto the receptors. They glob on from out of nowhere. This focuses the illustration.
- [ ] Try rendering a background texture with other cells and a furry exterior. Try a less curvy ecoli body shape. See Figma.

# Notes 12/23/22

- [ ] Make flagella look like they're moving in 3D space (rather than up and down on a plane as they do now)
- [x] Make run flagella look coiled together https://www.youtube.com/watch?v=25FtMdIFtXM
- [x] Some flagella can be different opacity to imply depth https://www.figma.com/file/2RcSVfM0iCMwMsBaLmPINC/E.-Coli-Project?node-id=311%3A20&t=Lj8p1mVwXxgar80y-1
- [ ] Draw shapes for receptors
- [ ] Make distinction between run and tumble gif more obvious - shorten GIFs to clearest states
- [ ] Make GIF ecoli point left like the canvas
- [ ] Port graph things back in from lunar lander
- [x] Move attractant from left to right

# Notes 11/16/22

- [x] Find the right cheY balance for a good simulation and remove the control
- [x] Find way to make attractant not stop at a "wall" - can we inverse the "is in path" method?
- [x] Draw shapes for motors
- [ ] Draw shapes for receptors
- [x] Better colors
- [ ] Larger size / maybe proportional?
- [ ] Port graph things back in from lunar lander
- [ ] Make distinction between run and tumble gif more obvious - shorten GIFs to clearest states

# Notes 9/16/22

- Paths for motors, receptors, and attractant
  - Effects, like the focus-plane blurring of the run/tumble GIF
- Some kind of illustrative background texture / noise similar to run/tumble GIF
- Scale everything up / make responsive
- Motors should animate / rotate, and change direction depending on state
- Docked state of cheY on receptor and motor should be more illustrative
  - Plus attractant
- Motors should appear on top and bottom edges
- Import improved tiny graph from lunar lander
- UI should be for attractant only and not cheY, make UI nicer also

## Methylation and bio questions next steps:

- Should the number of cheY or attractant required to "flip" the receptors and motors be proportional to the number of entities?
- Should phosphorylation wear off after some timeout? As-is, cheY MUST bind to a motor to become dephosphorylated
- Can phospohralted cheY stick to receptors? Right now they don't
