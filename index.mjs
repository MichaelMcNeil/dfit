const { Time } = require("./modules/duration/index.js/index.js.js");
const { Distance } = require("./modules/distance/index.js/index.js");
const { Interval } = require("./modules/interval.js");

export const distance = (value, unit) => Distance.of(value, unit);

export const time = (value, format) => Time.of(value, format);

export const interval = (distance, distanceUnit, time, timeFormat) =>
  Interval.of(distance, distanceUnit, time, timeFormat);
