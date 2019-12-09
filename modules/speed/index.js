const Duration = require("../duration");
const Distance = require("../distance");

class Speed {
  /**
   * Initializes a new Speed in mph {Number}, or calculates with given {Duration/Distance}, or defaults to 0mph
   * @param {Duration|Distance|Number|Undefined} [arg1]
   * @param {Distance|Duration} [arg2]
   */
  constructor(arg1, arg2) {
    if (arg1 instanceof Duration && arg2 instanceof Distance) {
      this._duration = arg1;
      this._distance = arg2;
    } else if (arg2 instanceof Duration && arg1 instanceof Distance) {
      this._duration = arg2;
      this._distance = arg1;
    } else {
      switch (typeof arg1) {
        case "number":
          this._duration = new Duration(1, "h");
          this._distance = new Distance(arg1, "miles");
          break;
        default:
          this._distance = new Distance();
          this._duration = new Duration(1, "h");
      }
    }
  }

  _isInstanceOf(instance) {
    return "Speed" === instance;
  }

  /**
   * Calculates the speed for the provided units
   * @param {'km'|'m'|'cm'|'mm'|'mile'|'miles'} distanceUnit
   * @param {'ms'|'s'|'m'|'h'|'d'|'w'|'y'} timeUnit
   * @returns {Number}
   */
  convert(distanceUnit, timeUnit) {
    return (
      this._distance.convert(distanceUnit) / this._duration.convert(timeUnit)
    );
  }

  /**
   * @returns {Number} - Speed in km/h
   */
  km_h() {
    return this.convert("km", "h");
  }

  /**
   * @returns {Number} - Speed in mph
   */
  mph() {
    return this.convert("mile", "h");
  }
}

module.exports = Speed;
