const {
  DEFAULT_DISTANCE_UNIT,
  RELATIVE_DISTANCE_UNIT
} = require("./constants.js");

const standardize = (value, unit) =>
  value * RELATIVE_DISTANCE_UNIT[unit || DEFAULT_DISTANCE_UNIT];

class Distance {
  static of(value, unit) {
    return new Distance(value, unit);
  }

  constructor(value, unit) {
    this.distance = standardize(value, unit) || 0;
    return this;
  }

  convert(unit) {
    return (
      this.distance / RELATIVE_DISTANCE_UNIT[unit || DEFAULT_DISTANCE_UNIT]
    );
  }

  _update(value, unit) {
    this.distance = standardize(value, unit);
    return this;
  }

  km(value) {
    return arguments.length !== 0
      ? this._update(value, "km")
      : this.convert("km");
  }

  m(value) {
    return arguments.length !== 0
      ? this._update(value, "m")
      : this.convert("m");
  }

  cm(value) {
    return arguments.length !== 0
      ? this._update(value, "cm")
      : this.convert("cm");
  }

  mm(value) {
    return arguments.length !== 0
      ? this._update(value, "mm")
      : this.convert("mm");
  }

  miles(value) {
    return arguments.length !== 0
      ? this._update(value, "mile")
      : this.convert("mile");
  }

  add(value, unit) {
    this.distance += standardize(value, unit);
    return this;
  }

  subtract(value, unit) {
    this.distance -= standardize(value, unit);
    return this;
  }
}

module.exports = {
  Distance
};
