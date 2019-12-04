const { Time } = require("./time.js");
const { Distance } = require("./distance.js");
const { Speed } = require("./speed.js");
const { Pace } = require("./pace.js");

class Interval {
  static of(distance, distanceUnit, time, timeFormat) {
    return new Interval(distance, distanceUnit, time, timeFormat);
  }

  constructor(distance, distanceUnit, time, timeFormat) {
    this.time = Time.of(time, timeFormat);
    this.distance = Distance.of(distance, distanceUnit);
    return this;
  }

  pace() {
    return Pace.of(this);
  }

  speed() {
    return Speed.of(this);
  }
}

module.exports = { Interval };
