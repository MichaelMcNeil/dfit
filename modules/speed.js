export const speed = interval => Speed.of(interval);

class Speed {
  static of(interval) {
    return new Speed(interval);
  }

  /**
   * Speed class
   * @param {Object}
   * @return {Object} this
   * @constructor
   */
  constructor(params) {
    this.time = params.time;
    this.distance = params.distance;
    return this;
  }

  /**
   * calculate speed in appropriate distance and time units, example km/h, MPH
   * @param {string} distanceUnit Optional default DEFAULT_DIST_UNIT 'm' - meters
   * @param {string} timeUnit Optional default DEFAULT_TIME_UNIT 'h' - hour
   * @return {float}
   */
  convert(distanceUnit, timeUnit) {
    return this.distance.convert(distanceUnit) / this.time.convert(timeUnit);
  }

  km_h() {
    return this.convert("km", "h");
  }

  mph() {
    return this.convert("mile", "h");
  }
}
