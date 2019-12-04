const { Time } = require("./time.js");

class Pace {
  static of(interval) {
    return new Pace(interval);
  }

  constructor(params) {
    this.time = params.time;
    this.distance = params.distance;
    return this;
  }

  convert(distanceUnit) {
    return Time.of(
      this.time.milliseconds() / this.distance.convert(distanceUnit),
      "ms"
    );
  }

  minutes_per_mile() {
    return this.convert("mile").minutes();
  }

  minutes_per_km() {
    return this.convert("km").minutes();
  }

  per_km() {
    return this.convert("km");
  }

  per_mile() {
    return this.convert("mile");
  }
}

module.exports = {
  Pace
};
