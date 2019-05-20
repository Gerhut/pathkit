import "mocha";
import "should";

import { resolve } from "path";

import Path = require("../src");

describe("Path", () => {
  it("should construct in absolute path", () => {
    const path = new Path("/usr");
    path.toString().should.eql("/usr");
  });

  it("should construct in relative path", () => {
    const path = new Path("../usr");
    path.toString().should.eql(resolve("../usr"));
  });
});
