import moment from "moment";
import { stopwatch } from "./time.js/index.js";

/**
 * Pace Builder
 * @param {Object} interval
 * @return {Object} Pace
 *
 */
export const pace = interval => Pace.of(interval);

class Pace {
  static of(interval) {
    return new Pace(interval);
  }

  /**
   * Pace class
   * @param {Object} interval
   * @return {Object} this
   * @constructor
   */
  constructor(params) {
    this.time = params.time;

    this.distance = params.distance;
    return this;
  }

  /**
   * calculate pace in appropriate distance and returns a stopwatch set to the appropriate time
   * @param {string} distanceUnit Optional default DEFAULT_DIST_UNIT 'm' - meters
   * @return {stopwatch}
   */
  convert(distanceUnit) {
    return stopwatch(
      moment.utc(this.time.milliseconds() / this.distance.convert(distanceUnit))
    );
  }

  minutes_per_mile() {
    return this.convert("mile").minutes();
  }

  minutes_per_km() {
    return this.convert("km").minutes();
  }

  /**
   * calculate pace time per kilometer
   * @return {stopwatch}
   */
  per_km() {
    return this.convert("km");
  }

  /**
   * calculate pace time per mile
   * @return {stopwatch}
   */
  per_mile() {
    return this.convert("mile");
  }
}
