const DEFAULT_TIME_FORMAT = "HH:mm:ss.SSS";

const DEFAULT_TIME_UNIT = "ms";

const RELATIVE_TIME_UNIT = {
  ms: 1,
  s: 1000,
  m: 60 * 1000,
  h: 60 * 60 * 1000
};

const DEFAULT_DISTANCE_UNIT = "m";

const RELATIVE_DISTANCE_UNIT = {
  km: 1000,
  m: 1,
  cm: 0.01,
  mm: 0.001,
  mile: 1609.344,
  miles: 1609.344
};

module.exports = {
  DEFAULT_TIME_FORMAT,
  DEFAULT_TIME_UNIT,
  RELATIVE_TIME_UNIT,
  DEFAULT_DISTANCE_UNIT,
  RELATIVE_DISTANCE_UNIT
};
