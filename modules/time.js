import {
  DEFAULT_TIME_FORMAT,
  DEFAULT_TIME_UNIT,
  RELATIVE_TIME_UNIT
} from "./constants.js";
import moment from "moment";

const utc = (timeValue, timeFormat) => {
  return moment.utc(
    `1970-01-01 ${timeValue}`,
    `YYYY-MM-DD ${timeFormat || DEFAULT_TIME_FORMAT}`
  );
};

const standardize = (value, format) =>
  value && value._isAMomentObject
    ? value
    : utc(
        value || "00:00:00.000",
        value && format ? format : DEFAULT_TIME_FORMAT
      );

export const time = (value, format) => Time.of(value, format);

class Time {
  static of(value, format) {
    return new Time(value, format);
  }

  constructor(timeValue, timeFormat) {
    this.time = standardize(timeValue, timeFormat);
    return this;
  }

  asMoment() {
    return this.time;
  }

  format(timeFormat) {
    return this.time.format(timeFormat || DEFAULT_TIME_FORMAT);
  }

  convert(timeUnit) {
    return (
      parseInt(this.format("x")) /
      RELATIVE_TIME_UNIT[timeUnit || DEFAULT_TIME_UNIT]
    );
  }

  _update(value, format) {
    this.time = standardize(value, format);
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
    this.time = moment.utc(
      this.time -
        (timeValue._isAMomentObject ? timeValue : utc(timeValue, timeFormat))
    );
    return this;
  }

  add(timeValue, timeFormat) {
    this.time = moment.utc(
      this.time +
        (timeValue._isAMomentObject ? timeValue : utc(timeValue, timeFormat))
    );
    return this;
  }

  pretty() {
    return this.time.format("m:ss");
  }
}
