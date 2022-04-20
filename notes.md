# Notes 4/19/22

- Motors need an accumulation of cheY to change direction
  - Motors could have an prop "direction", 0.0-1.0, which docked cheYs influence when attached
- cheY needs to dock faster with receptors
- What happens to attractant after it's sensed? Is it "spent"?
  - Maybe could be absorbed / removed
  - If that's true then we need to be generate new attractant over time
  - Maybe attractant could respawn randomly when absorbed - makes slider a little easier
- Can phospohralted cheY stick to receptors? Right now they don't
- When the slider moves, only change the quantity of the controlled item - but the state of everything else should remain constant
- Motors can appear on top and bottom edges
- Receptors should be bigger and on the boundary of the shape
- Receptor active state needs to be toggled by attractant

## Polish

- Motor animation
- Edge bounce behavior needs to be a reflected bounce

## Minor

- Would be nice to fix the hot reload issue just for annoyance-sake
