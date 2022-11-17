import { randomBetween, generateID } from "../helpers.js";
import { receptorProperties } from "../data.js";

export class Receptor {
  constructor() {
    this.id = generateID();
    this.position = receptorProperties.positions.pop();
    this.type = "receptor";
    this.color = receptorProperties.activeColor;
    this.size = receptorProperties.defaultSize;
    this.active = true;
  }

  activate() {
    this.active = true;
    this.color = receptorProperties.activeColor;
  }

  deactivate() {
    this.active = false;
    this.color = receptorProperties.defaultColor;
  }

  draw(CTX) {
    CTX.fillStyle = this.color;
    CTX.fillRect(this.position.x, this.position.y, this.size, this.size);
  }
}
