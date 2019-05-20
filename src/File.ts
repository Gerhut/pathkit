import { promises as fs } from "fs";

import Path from "./Path";

const { readFile } = fs;

export default class File extends Path {
  public async read(encoding: BufferEncoding = "utf8") {
    try {
      return await readFile(this.pathname, encoding);
    } catch (error) {
      throw PathError.wrap(this, error);
    }
  }

  public async readBuffer() {
    try {
      return await readFile(this.pathname);
    } catch (error) {
      throw PathError.wrap(this, error);
    }
  }
}

import PathError from "./PathError";
