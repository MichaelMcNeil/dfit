import { time } from "./time.js";
import { distance } from "./distance.js";
import { speed } from "./speed.js";
import { pace } from "./pace.js";

export const interval = (distance, distanceUnit, time, timeFormat) =>
  Interval.of(distance, distanceUnit, time, timeFormat);

class Interval {
  static of(distance, distanceUnit, time, timeFormat) {
    return new Interval(distance, distanceUnit, time, timeFormat);
  }

  constructor(distance, distanceUnit, time, timeFormat) {
    this.time = time(time, timeFormat);
    this.distance = distance(distance, distanceUnit);
    this.speed = speed(this);
    this.pace = pace(this);
    return this;
  }
}
