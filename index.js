/**
 * @module dfit
 */

const Duration = require("./modules/duration");
const Distance = require("./modules/distance");
const Interval = require("./modules/interval");
const Speed = require("./modules/speed");
const Pace = require("./modules/pace");

/**
 * Creates a Duration object (wraps new Duration)
 * @param  {...(Object|Number|String)} args
 * - {Object} with optional keys ms|s|m|h|d|y
 * - {Number} duration, {String} [unit=DEFAULT_DURATION_UNIT]
 * @returns Duration
 */
const duration = (...args) => new Duration(...args);

/**
 * Creates a Distance object (wraps new Distance)
 * @param  {...(Object|Number|String)} args
 * - {Object} with optional keys mm|cm|m|km|mile|miles
 * - {Number} distance, {String} [unit=DEFAULT_DISTANCE_UNIT]
 * @returns Distance
 */
const distance = (...args) => new Distance(...args);

/**
 * Creates and Interval object (wraps new Interval)
 * @param  {...(Duration|Distance|Pace|Speed)} args - Any order of Duration, Distance, Pace, or Speed
 * @returns Interval
 */
const interval = (...args) => new Interval(...args);

/**
 * Creates a Speed object (wraps new Speed)
 * @param  {...(Duration|Distance|Number)} args
 * - {Duration}, {Distance}
 * - {Distance}, {Duration}
 * - {Number} as mph
 * - ... otherwise defaults to 0 mph
 * @returns Speed
 */
const speed = (...args) => new Speed(...args);

/**
 * Creates Pace object (wraps new Pace)
 * @param {...(Duration|Distance|object|number|string)} args
 * - {Duration, {Distance}
 * - {Number|Object} duration, {Number|Object} distance, {String} [durationUnit], {String} [distanceUnit]
 * @returns Pace
 */
const pace = (...args) => new Pace(...args);

module.exports = {
  duration,
  distance,
  interval,
  speed,
  pace
};
