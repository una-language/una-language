const assert = require("chai").assert;
const { clean, divide, parse, prepare, translate } = require("./phases");

const compile = lines => translate(parse(prepare(clean(divide(lines)))));

describe("Compiler", () => {
  it("should compile integer declaration", () => {
    const code = "apples = 1";

    const compiled = compile(code);
    assert(compiled[0] === "const apples = 1;");
  });
});
