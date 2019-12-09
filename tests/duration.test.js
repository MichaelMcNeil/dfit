const Duration = require("../modules/duration");

test("should initialize time obj with default units", () => {
  const time = new Duration(5000);
  expect(time).toBeInstanceOf(Duration);
});
