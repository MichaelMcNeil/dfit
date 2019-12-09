const Duration = require("../duration");
const Distance = require("../distance");
const Speed = require("../speed");
const Pace = require("../pace");

class Interval {
  /**
   * Options:
   * Duration
   * Duration, Distance
   * Duration, Pace
   * Duration, Speed
   * 'HH:mm:ss'
   * Distance
   * Distance, Duration
   * Distance, Pace
   * Distance, Speed
   * Number || default to miles or arg3
   *
   * @param {*} arg1
   * @param {*} arg2
   * @param {*} arg3
   */
  constructor(...args) {
    for (let arg of args) {
      if (arg instanceof Distance) this._distance = arg;
      else if (arg instanceof Duration) this._duration = arg;
      else if (arg instanceof Pace) this._pace = arg;
      else if (arg instanceof Speed) this._speed = arg;
      else {
      }
    }
  }

  distance() {
    if (!this._distance) {
      if (this._pace && this._duration)
        this._distance = new Distance(
          this._duration.milliseconds() / this._pace.per_mile().milliseconds(),
          "miles"
        );
      else if (this._speed && this._duration)
        this._distance = new Distance(
          this._speed.mph() * this._duration.hours(),
          "miles"
        );
      else
        throw new Error(
          "Distance not set, nor could it be calculated. Provide is explicitly, or provide pace/speed & duration"
        );
    }

    return this._distance;
  }

  duration() {
    if (!this._duration) {
      if (this._pace && this._distance)
        this._duration = new Duration(
          this._pace.per_mile().milliseconds() * this._distance.miles(),
          "ms"
        );
      else if (this._speed && this._distance)
        this._duration = new Duration(
          this._distance.miles() / this._speed.mph(),
          "h"
        );
      else
        throw new Error(
          "Duration not set, nor could it be calculated. Provide it explicitly, or provide pace/speed & distance"
        );
    }

    return this._duration;
  }

  pace() {
    if (!this._pace) {
      if (this._distance && this._duration)
        this._pace = new Pace(this._duration, this._distance);
      else if (this._speed)
        this._pace = new Pace(1, this._speed.mph(), "h", "miles");
      else
        throw new Error(
          "Pace not set, nor could it be calculated. Provide it explicitly, or provide (distance && duration) || speed"
        );
    }

    return this._pace;
  }

  speed() {
    if (!this._speed) {
      if (this._distance && this._duration)
        this._speed = new Speed(this._distance, this._duration);
      else if (this._pace)
        this._speed = new Speed(new Distance(1, "mile"), this._pace.per_mile());
      else
        throw new Error(
          "Speed not set, nor could it be calculated. Provid is explicitly, or provide (distance && duration) || speed"
        );
    }

    return this._speed;
  }
}

module.exports = Interval;
