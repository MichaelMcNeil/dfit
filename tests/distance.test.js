const Distance = require("../modules/distance");
const {
  DEFAULT_DISTANCE_UNIT,
  RELATIVE_DISTANCE_UNIT
} = require("../modules/distance");

describe("Distance Class - Constructor", () => {
  test("should initialize distance to 0 without arguments", () => {
    const distance = new Distance();
    expect(distance._data).toEqual(0);
  });

  test("should initialize to default units with single integer", () => {
    const distance = new Distance(5000);
    expect(distance).toBeInstanceOf(Distance);
    expect(distance._data).toEqual(5000);
  });

  test("should initialize with integer and appropriate units", () => {
    const distance = new Distance(26.2, "miles");
    expect(distance).toBeInstanceOf(Distance);
  });

  test("should initialize with object of values", () => {
    const distance = new Distance({ km: 5, m: 5000 });
    expect(distance).toBeInstanceOf(Distance);
    expect(distance._data).toEqual(10000);
  });

  test("should throw if first agument is not object or number or undefined", () => {
    expect(() => new Distance("1knfe")).toThrow();
    expect(() => new Distance("1")).toThrow();
  });
});

describe("Distance Class - .convert()", () => {
  test("should return distance as miles", () => {
    const distance = new Distance(RELATIVE_DISTANCE_UNIT.m);
    expect(distance.convert("miles")).toEqual(
      RELATIVE_DISTANCE_UNIT.m / RELATIVE_DISTANCE_UNIT.miles
    );
  });

  test("should return distance as mm", () => {
    const distance = new Distance(RELATIVE_DISTANCE_UNIT.m);
    expect(distance.convert("mm")).toEqual(
      RELATIVE_DISTANCE_UNIT.m / RELATIVE_DISTANCE_UNIT.mm
    );
  });

  test("should return distance as km", () => {
    const distance = new Distance(RELATIVE_DISTANCE_UNIT.m);
    expect(distance.convert("km")).toEqual(
      RELATIVE_DISTANCE_UNIT.m / RELATIVE_DISTANCE_UNIT.km
    );
  });

  test("should return distance as cm", () => {
    const distance = new Distance(RELATIVE_DISTANCE_UNIT.m);
    expect(distance.convert("cm")).toEqual(
      RELATIVE_DISTANCE_UNIT.m / RELATIVE_DISTANCE_UNIT.cm
    );
  });

  test("should return distance as m", () => {
    const distance = new Distance(RELATIVE_DISTANCE_UNIT.m);
    expect(distance.convert("m")).toEqual(
      RELATIVE_DISTANCE_UNIT.m / RELATIVE_DISTANCE_UNIT.m
    );
  });

  test("should convert to the default unit if empty", () => {
    const distance = new Distance(
      RELATIVE_DISTANCE_UNIT[DEFAULT_DISTANCE_UNIT]
    );
    expect(distance.convert()).toEqual(
      RELATIVE_DISTANCE_UNIT[DEFAULT_DISTANCE_UNIT]
    );
  });

  test("should return default units if argument is invalid", () => {
    const distance = new Distance(RELATIVE_DISTANCE_UNIT.m);
    expect(() => distance.convert(null)).toThrow();
    expect(() => distance.convert("not valid")).toThrow();
  });
});
