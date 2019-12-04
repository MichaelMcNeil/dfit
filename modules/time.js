const {
  DEFAULT_TIME_FORMAT,
  DEFAULT_TIME_UNIT,
  RELATIVE_TIME_UNIT
} = require("./constants.js");
const moment = require("moment");

const standardize = value => {
  return value && value._isAMomentObject ? value : moment.duration(value || 0);
};

const standardizeWithFormat = (value, format) =>
  value && value._isAMomentObject
    ? value
    : moment.duration(value || 0, format || DEFAULT_TIME_FORMAT);

class Time {
  static of(value, format = undefined) {
    return new Time(value, format);
  }

  constructor(timeValue, timeFormat) {
    this.time =
      timeFormat === undefined
        ? standardize(timeValue)
        : standardizeWithFormat(timeValue, timeFormat);

    return this;
  }

  asMomentDuration() {
    return this.time;
  }

  asMoment() {
    return moment.utc(this.time.asMilliseconds());
  }

  getHoursMinutesSeconds() {
    const hours = this.time.hours();
    const minutes = this.time.minutes();
    const seconds = this.time.seconds();

    return { hours, minutes, seconds };
  }

  format(timeFormat) {
    return this.asMoment().format(timeFormat || DEFAULT_TIME_FORMAT);
  }

  convert(timeUnit) {
    return (
      parseInt(this.format("x")) /
      RELATIVE_TIME_UNIT[timeUnit || DEFAULT_TIME_UNIT]
    );
  }

  _update(value, format) {
    this.time = standardizeWithFormat(value, format);
    return this;
  }

  milliseconds(value) {
    return arguments.length !== 0
      ? this._update(value, "ms")
      : this.convert("ms");
  }

  seconds(value) {
    return arguments.length !== 0
      ? this._update(value, "s")
      : this.convert("s");
  }

  minutes(value) {
    return arguments.length !== 0
      ? this._update(value, "m")
      : this.convert("m");
  }

  hours(value) {
    return arguments.length !== 0
      ? this._update(value, "h")
      : this.convert("h");
  }

  substract(timeValue, timeFormat) {
    this.time = moment.duration(
      this.time -
        (timeValue._isAMomentObject
          ? timeValue
          : standardizeWithFormat(timeValue, timeFormat))
    );
    return this;
  }

  add(timeValue, timeFormat) {
    this.time = moment.duration(
      this.time +
        (timeValue._isAMomentObject
          ? timeValue
          : standardizeWithFormat(timeValue, timeFormat))
    );
    return this;
  }

  pretty() {
    const { hours, minutes, seconds } = this.getHoursMinutesSeconds();

    return `${hours > 0 ? hours + ":" : ""}${zeroIf(
      hours > 0 && minutes < 10
    )}${minutes}:${zeroIf(seconds < 10)}${seconds}`;
  }
}

const colonIf = condition => (condition ? ":" : "");

const zeroIf = condition => (condition ? "0" : "");

module.exports = { Time };
