# Notes 12/23/22

- [ ] Make flagella look like they're moving in 3D space (rather than up and down on a plane as they do now) 
- [ ] Make run flagella look coiled together https://www.youtube.com/watch?v=25FtMdIFtXM
- [ ] Some flagella can be different opacity to imply depth https://www.figma.com/file/2RcSVfM0iCMwMsBaLmPINC/E.-Coli-Project?node-id=311%3A20&t=Lj8p1mVwXxgar80y-1
- [ ] Draw shapes for receptors
- [ ] Make distinction between run and tumble gif more obvious - shorten GIFs to clearest states
- [ ] Make GIF ecoli point left like the canvas
- [ ] Port graph things back in from lunar lander

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
