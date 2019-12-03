import { Time } from "./modules/time.js";
import { Distance } from "./modules/distance.js";
import { Interval } from "./modules/interval.js";

export const distance = (value, unit) => Distance.of(value, unit);

export const time = (value, format) => Time.of(value, format);

export const interval = (distance, distanceUnit, time, timeFormat) =>
  Interval.of(distance, distanceUnit, time, timeFormat);

export default {
  time,
  distance,
  interval
};
