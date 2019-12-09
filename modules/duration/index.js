/**
 * Duration module
 * @module Duration
 */

const moment = require("moment");

const DEFAULT_TIME_FORMAT = "HH:mm:ss.SSS";

class Duration {
  /**
   * Initializes a Duration
   * @param {object|number|string} arg1
   * @param {string} arg2
   */
  constructor(arg1, arg2) {
    switch (typeof arg1) {
      case "object":
        if (moment.isDuration(arg1)) this._data = arg1;
        else this._data = moment.duration(arg1);
        break;
      case "number":
        this._data = moment.duration(arg1, arg2 || DEFAULT_TIME_FORMAT);
        break;
      case "string":
        this._data = moment.duration(arg1);
        break;
      default:
        throw new Error(
          "typeof value provided to Time constructor is invalid."
        );
    }
  }

  /**
   * Calculates and returns a moment Duration from a given Distance and Pace
   * @param {Distance} distance
   * @param {Pace} pace
   * @returns {moment.duration}
   */
  static _constructFromDistanceAndPace(distance, pace) {
    return moment.duration(
      pace.per_mile().milliseconds() * distance.miles(),
      "ms"
    );
  }

  _isInstanceOf(instance) {
    return "Duration" === instance;
  }

  /**
   * Returns duration as a moment duration
   * @returns {moment.duration}
   */
  asMomentDuration() {
    return this._data;
  }

  /**
   * Returns duration as a moment object
   * @returns {moment}
   */
  asMoment() {
    return moment.utc(this._data.asMilliseconds());
  }

  /**
   * Seperates and returns the Duration in parts {years|months|weeks|days|hours|minutes|seconds}
   * @returns {object}
   */
  inParts() {
    const years = this._data.years();
    const months = this._data.months();
    const weeks = this._data.weeks();
    const days = this._data.days();
    const hours = this._data.hours();
    const minutes = this._data.minutes();
    const seconds = this._data.seconds();

    return { years, months, weeks, days, hours, minutes, seconds };
  }

  /**
   * Resets the value of the Duration and allows for chaining
   * @param {Number} value
   * @param {'ms'|'s'|'m'|'h'|'d'|'w'|'y'} format
   * @returns {this}
   */
  _updateAndChain(value, format) {
    this._data = moment.duration(value, format || DEFAULT_TIME_FORMAT);
    return this;
  }

  convert(unit) {
    switch (unit) {
      case "ms":
        return this.milliseconds();
      case "s":
        return this.seconds();
      case "m":
        return this.minutes();
      case "h":
        return this.hours();
    }
  }

  /**
   * Gets, or optionally sets, the Duration in milliseconds
   * @param {Number} value
   * @returns {Number|this}
   */
  milliseconds(value) {
    return arguments.length !== 0
      ? this._updateAndChain(value, "ms")
      : this._data.asMilliseconds();
  }

  /**
   * Gets, or optionally sets, the Duration in seconds
   * @param {Number} value
   * @returns {Number|this}
   */
  seconds(value) {
    return arguments.length !== 0
      ? this._updateAndChain(value, "s")
      : this._data.asSeconds();
  }

  /**
   * Gets, or optionally sets, the Duration in minutes
   * @param {Number} value
   * @returns {Number|this}
   */
  minutes(value) {
    return arguments.length !== 0
      ? this._updateAndChain(value, "m")
      : this._data.asMinutes();
  }

  /**
   * Gets, or optionally sets, the Duration in hours
   * @param {Number} value
   * @returns {Number|this}
   */
  hours(value) {
    return arguments.length !== 0
      ? this._updateAndChain(value, "h")
      : this._data.asHours();
  }

  /**
   * Subtracts the give Duration from the current Duration
   * @param {Number} value
   * @param {'ms'|'s'|'m'|'h'|'d'|'w'|'y'} format
   * @returns {this}
   */
  substract(value, format) {
    this._data = moment.duration(
      this._data - new Duration(value, format)._data
    );
    return this;
  }

  /**
   * Adds the give Duration to the current Duration
   * @param {Number} value
   * @param {'ms'|'s'|'m'|'h'|'d'|'w'|'y'} format
   * @returns {this}
   */
  add(value, format) {
    this._data = moment.duration(
      this._data + new Duration(value, format)._data
    );
    return this;
  }

  /**
   * Formats the Duration a string.  [HH][:][m]m:ss
   * @returns {string}
   */
  pretty() {
    const { hours, minutes, seconds } = this.inParts();

    return `${hours > 0 ? hours + ":" : ""}${
      hours > 0 && minutes < 10 ? "0" : ""
    }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  /**
   * Formats the Duration with moment.format()
   * @param {String} [timeFormat=DEFAULT_TIME_FORMAT] - A format to pass to the moment.format() function
   */
  format(timeFormat) {
    return this.asMoment().format(timeFormat || DEFAULT_TIME_FORMAT);
  }
}

module.exports = Duration;
