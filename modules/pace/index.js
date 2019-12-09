/**
 * Pace description
 * @module Pace
 */

const Duration = require("../duration");
const Distance = require("../distance");

class Pace {
  /**
   * Creates a Pace object
   * @param {Duration|object|number} duration
   * @param {Distance|object|number|undefined} distance
   * @param {string} [durationUnit]
   * @param {string} [distanceUnit]
   */
  constructor(duration, distance, durationUnit, distanceUnit) {
    if (duration instanceof Duration) this._duration = duration;
    else this._duration = new Duration(duration, durationUnit);

    if (distance instanceof Distance) this._distance = distance;
    else {
      switch (typeof distance) {
        case "undefined":
          this._distance = new Distance(1, "mile");
          break;
        case "object":
        case "number":
          this._distance = new Distance(distance, distanceUnit);
          break;
        default:
          this._distance = new Distance(1, "mile");
      }
    }
  }

  _isInstanceOf(instance) {
    return "Pace" === instance;
  }

  /**
   * Creates a Duration representing the Pace of a stored Duration and Distance
   * @param {'km'|'m'|'cm'|'mm'|'mile'|'miles'} distanceUnit
   * @returns {Duration} A Duration object accounting for a given distance
   */
  convert(distanceUnit) {
    return new Duration(
      this._duration.milliseconds() / this._distance.convert(distanceUnit),
      "ms"
    );
  }

  /**
   * Creates a Duration representing the pace as Duration/km
   * @returns {Duration}
   */
  per_km() {
    return this.convert("km");
  }

  /**
   * Creates a Duration representing the pace as Duration/mile
   * @returns {Duration}
   */
  per_mile() {
    return this.convert("mile");
  }
}

/**
 * @exports Pace
 */
module.exports = Pace;
