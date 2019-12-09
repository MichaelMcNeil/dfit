const dfit = require("../index");

describe("Interval - Distance", () => {
  test("should set in the constructor", () => {
    const interval = dfit.interval(dfit.distance(24, "miles"));
    expect(interval.distance().miles()).toEqual(24);
  });

  test("should calculate from duration and pace", () => {
    const interval = dfit.interval(
      dfit.duration(8, "m"),
      dfit.pace(8, 1, "m", "mile")
    );

    expect(interval.distance().miles()).toEqual(1);
  });

  test("should calculate from duration and speed", () => {
    const interval = dfit.interval(dfit.duration(1, "h"), dfit.speed(24));
    expect(interval.distance().miles()).toEqual(24);
  });
});

describe("Interval - Duration", () => {
  test("should set in the constructor", () => {
    const interval = dfit.interval(dfit.duration(5, "m"));
    expect(interval.duration().minutes()).toEqual(5);
  });

  test("should calculate from distance and pace", () => {
    const interval = dfit.interval(
      dfit.distance(8, "miles"),
      dfit.pace(1, 8, "h", "miles")
    );

    expect(interval.duration().hours()).toEqual(1);
  });

  test("should calculate from distance and speed", () => {
    const interval = dfit.interval(dfit.distance(5, "miles"), dfit.speed(5));
    expect(interval.duration().hours()).toEqual(1);
  });
});

describe("Interval - Pace", () => {
  test("should set via the constructor", () => {
    const pace = dfit.pace(dfit.distance(5, "km"), dfit.duration(19, "m"));
    const interval = dfit.interval(pace);
    expect(
      interval
        .pace()
        .per_mile()
        .minutes()
    ).toEqual(pace.per_mile().minutes());
  });

  test("should calculate given distance and duration", () => {
    const interval = dfit.interval(
      dfit.duration(8, "m"),
      dfit.distance(1, "mile")
    );

    expect(
      interval
        .pace()
        .per_mile()
        .minutes()
    ).toEqual(8);
  });

  test("should calculate given speed", () => {
    const interval = dfit.interval(dfit.speed(6));
    expect(
      interval
        .pace()
        .per_mile()
        .minutes()
    ).toEqual(10);
  });
});

describe("Interval - Speed", () => {
  test("should set via constructor", () => {
    const interval = dfit.interval(dfit.speed(24));
    expect(interval.speed().mph()).toEqual(24);
  });

  test("should calculate give distance and duration", () => {
    const interval = dfit.interval(
      dfit.distance(6, "miles"),
      dfit.duration(1, "h")
    );
    expect(interval.speed().mph()).toEqual(6);
  });

  test("should calculate given pace", () => {
    const pace = dfit.pace(dfit.duration(1, "h"), dfit.distance(6, "miles"));
    const interval = dfit.interval(pace);
    expect(interval.speed().mph()).toEqual(6);
  });
});
