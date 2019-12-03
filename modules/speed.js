export class Speed {
  static of(interval) {
    return new Speed(interval);
  }

  constructor(interval) {
    this.time = interval.time;
    this.distance = interval.distance;
    return this;
  }

  convert(distanceUnit, timeUnit) {
    return this.distance.convert(distanceUnit) / this.time.convert(timeUnit);
  }

  km_h() {
    return this.convert("km", "h");
  }

  mph() {
    return this.convert("mile", "h");
  }
}
