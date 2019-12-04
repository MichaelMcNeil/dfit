function foo(a, b) {
  if (b === undefined)
    // parameter was omitted in call
    b = "some default value";

  if (typeof a === "string") this._constructInSomeWay(a, b);
  else if (a instanceof MyType) this._constructInSomeOtherWay(a, b);
}

function bar(argmap) {
  if ("optionalparam" in argmap)
    this._constructInSomeWay(argmap.param, argmap.optionalparam);
}

bar({ param: 1, optionalparam: 2 });
