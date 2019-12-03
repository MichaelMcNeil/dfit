import moment from "moment";
import { Time } from "./time.js";

export class Pace {
  static of(interval) {
    return new Pace(interval);
  }

  constructor(params) {
    this.time = params.time;
    this.distance = params.distance;
    return this;
  }

  convert(distanceUnit) {
    return Time.of(
      moment.utc(this.time.milliseconds() / this.distance.convert(distanceUnit))
    );
  }

  minutes_per_mile() {
    return this.convert("mile").minutes();
  }

  minutes_per_km() {
    return this.convert("km").minutes();
  }

  per_km() {
    return this.convert("km");
  }

  per_mile() {
    return this.convert("mile");
  }
}
