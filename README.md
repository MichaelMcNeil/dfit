# dfit

For Interval, Pace/Speed, Distance, and Duration calculations

### Usage

```javascript
import * as dfit from "dfit";

// Objects
dfit.interval();
dfit.distance();
dfit.duration();
dfit.speed();
dfit.pace();
```

#### Creating a Duration

```javascript
let dur;

// with an object - can accept any keys allowed by moment.duration()  {y|M|w|d|h|m|s|ms}
dur = dfit.duration({ h: 2, m: 55, s: 00 });
dur.pretty(); // '2:55:00'

// with a string
dur = dfit.duration("2:55:00");
dur.pretty(); // '2:55:00'

// with a number and unit
dur = dfit.duration(2, "h");
dur.pretty(); // '2:00:00'

// adding or subtracting
dur = dfit.duration(2, "h").add({ m: 55 });
dur.pretty(); // '2:55:00'

dur = dfit.duration("3:00:00").subtract(5, "m");
dur.pretty(); // '2:55:00'
```

#### Creating a Distance

```javascript
let dist;

// with an object - accepted units {km|m|cm|mm|mile|miles}
dist = dfit.distance({ miles: 26.2 });

// with a number and unit
dist = dfit.distance(10, "km");

// initialize to 0
dist = dfit.distance();
```

#### Creating a Pace

```javascript
let pace;

// with Duration and Distance
pace = dfit.pace(dfit.duration({ h: 2, m: 55 }), dfit.distance(26.2, "miles"));

// with duration/distance values and units  (duration, distance, durationUnit, distanceUnit)
pace = dfit.pace("2:55:00", 26.2, null, "miles");
```

### Installation

**_Prerequisite:_**

Install package:

```

npm install dfit

```

### Dependencies

dfit depends on the following modules at runtime:

- [moment](https://github.com/moment/moment) - For Duration calculations

dfit depends on the following modules for testing:

- [jest](https://github.com/facebook/jest/)

### Full npm script reference

#### npm test

Cleans the build folder, copies squarespace files (jsont, less, assets folder content) into the build folder, runs webpack to build the template javascript.

### Project Structure

    /base-template-npm
    |--- modules/
    |--- tests/
    |--- index.js
    |--- index.mjs
    |--- node_modules/      <-- generated by npm install, ignored by this repo
    |--- package.json        <-- defines build commands, template module dependencies

<!-- ## Copyright and License -->

```

```
