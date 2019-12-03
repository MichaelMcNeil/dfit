import { Time } from "./time.js";
import { Distance } from "./distance.js";
import { Speed } from "./speed.js";
import { Pace } from "./pace.js";

export class Interval {
  static of(distance, distanceUnit, time, timeFormat) {
    return new Interval(distance, distanceUnit, time, timeFormat);
  }

  constructor(distance, distanceUnit, time, timeFormat) {
    this.time = Time.of(time, timeFormat);
    this.distance = Distance.of(distance, distanceUnit);
    return this;
  }

  pace() {
    return Pace.of(this);
  }

  speed() {
    return Speed.of(this);
  }
}
