const { Time } = require("./modules/time.js");
const { Distance } = require("./modules/distance.js");
const { Interval } = require("./modules/interval.js");

const distance = (value, unit) => Distance.of(value, unit);

const time = (value, format) => Time.of(value, format);

const interval = (distance, distanceUnit, time, timeFormat) =>
  Interval.of(distance, distanceUnit, time, timeFormat);

module.exports = {
  time,
  distance,
  interval
};
