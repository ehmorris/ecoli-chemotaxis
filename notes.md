# Notes 4/19/22

- Motors need an accumulation of cheY to change direction
  - Motors could have an prop "direction", 0.0-1.0, which docked cheYs influence when attached
- cheY needs to dock faster with receptors
- Can phospohralted cheY stick to receptors? Right now they don't
- When the slider moves, only change the quantity of the controlled item - but the state of everything else should remain constant
- Motors can appear on top and bottom edges
- Receptors should be bigger and on the boundary of the shape
- Should the number of cheY or attractant required to "flip" the receptors and motors be proportional to the number of entities?
- Should maybe just get all intersecting entities and then filter over that list

## Polish

- Motor animation
- Edge bounce behavior needs to be a reflected bounce

## Minor

- Would be nice to fix the hot reload issue just for annoyance-sake
