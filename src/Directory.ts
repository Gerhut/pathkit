import { promises as fs } from "fs";

import Path from "./Path";

const { readdir } = fs;

export default class Directory extends Path {
  public async *[Symbol.asyncIterator]() {
    for (const name of await readdir(this.pathname)) {
      yield this.get(name);
    }
  }
}
