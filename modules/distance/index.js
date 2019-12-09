/**
 * Distance Module
 * @module Distance
 */

/**
 * Default unit used when units not given
 * @constant
 */
const DEFAULT_DISTANCE_UNIT = "m";

/**
 * Units Relative to One Meter
 * @constant
 */
const RELATIVE_DISTANCE_UNIT = {
  km: 1000,
  m: 1,
  cm: 0.01,
  mm: 0.001,
  mile: 1609.344,
  miles: 1609.344
};

class Distance {
  /**
   * Creates a distance object that standardizes all incoming data and is useful in making conversions
   * @param {object|number|undefined} distance -
   * @param {'km'|'m'|'cm'|'mm'|'mile'|'miles'} [unit]
   */
  constructor(distance, unit) {
    switch (typeof distance) {
      case "object":
        this._data = Distance._constructFromObj(distance);
        break;
      case "number":
        this._data = Distance._constructFromValueAndUnit(distance, unit);
        break;
      case "undefined":
        this._data = 0;
        break;
      default:
        throw new Error("Invalid constructor argument");
    }
  }

  /**
   * Standardizes incoming distance values
   * @param {Number} value
   * @param {'km'|'m'|'cm'|'mm'|'mile'|'miles'} unit
   * @returns {Number}
   */
  static _constructFromValueAndUnit(value, unit) {
    return value * RELATIVE_DISTANCE_UNIT[unit || DEFAULT_DISTANCE_UNIT];
  }

  /**
   * Calculates distance by summing all valid distances sent with the object
   * @param {Object} obj
   * @param {Number} [obj.km]
   * @param {Number} [obj.m]
   * @param {Number} [obj.cm]
   * @param {Number} [obj.mm]
   * @param {Number} [obj.mile]
   * @param {Number} [obj.miles]
   * @returns {Number} 0 or the sum of valid distances
   */
  static _constructFromObj(obj) {
    let distance = 0;
    for (let unit in obj) {
      distance += this._constructFromValueAndUnit(obj[unit], unit);
    }
    return distance;
  }

  /**
   * Returns the distance converted to the given units
   * @param {'km'|'m'|'cm'|'mm'|'mile'|'miles'} [unit=DEFAULT_DISTANCE_UNIT]
   * @returns {Number}
   */
  convert(unit) {
    if (
      arguments.length &&
      (unit === null || !RELATIVE_DISTANCE_UNIT.hasOwnProperty(unit))
    )
      throw new Error("Unit provided to convert is invalid");

    return this._data / RELATIVE_DISTANCE_UNIT[unit || DEFAULT_DISTANCE_UNIT];
  }

  /**
   * Updates the distance given a new value and unit and returns 'this' to allow chaining
   * @param {Number} value
   * @param {'km'|'m'|'cm'|'mm'|'mile'|'miles'} unit
   * @returns {this}
   */
  _updateAndChain(value, unit) {
    this._data = _constructFromValueAndUnit(value, unit);
    return this;
  }

  /**
   * Gets, or optionally sets, the distance in kilometers
   * @param {Number} [value]
   * @returns {this|Number}
   */
  km(value) {
    return arguments.length !== 0
      ? this._updateAndChain(value, "km")
      : this.convert("km");
  }

  /**
   * Gets, or optionally sets, the distance in meters
   * @param {Number} [value]
   * @returns {this|Number}
   */
  m(value) {
    return arguments.length !== 0
      ? this._updateAndChain(value, "m")
      : this.convert("m");
  }

  /**
   * Gets, or optionally sets, the distance in centimeters
   * @param {Number} [value]
   * @returns {this|Number}
   */
  cm(value) {
    return arguments.length !== 0
      ? this._updateAndChain(value, "cm")
      : this.convert("cm");
  }

  /**
   * Gets, or optionally sets, the distance in millimeters
   * @param {Number} [value]
   * @returns {this|Number}
   */
  mm(value) {
    return arguments.length !== 0
      ? this._updateAndChain(value, "mm")
      : this.convert("mm");
  }

  /**
   * Gets, or optionally sets, the distance in miles
   * @param {Number} [value]
   * @returns {this|Number}
   */
  miles(value) {
    return arguments.length !== 0
      ? this._updateAndChain(value, "miles")
      : this.convert("miles");
  }

  /**
   * Adds a given distance to the current distance
   * @param {Number} value
   * @param {'km'|'m'|'cm'|'mm'|'mile'|'miles'} unit
   * @returns {this}
   */
  add(value, unit) {
    this._data += _constructFromValueAndUnit(value, unit);
    return this;
  }

  /**
   * Subtracts a given distance from the current distance
   * @param {Number} value
   * @param {'km'|'m'|'cm'|'mm'|'mile'|'miles'} unit
   * @returns {this}
   */
  subtract(value, unit) {
    this._data -= _constructFromValueAndUnit(value, unit);
    return this;
  }
}

module.exports = Distance;
module.exports.RELATIVE_DISTANCE_UNIT = RELATIVE_DISTANCE_UNIT;
module.exports.DEFAULT_DISTANCE_UNIT = DEFAULT_DISTANCE_UNIT;
