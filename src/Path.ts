import { promises as fs } from "fs";
import { basename, dirname, resolve } from "path";
import { URL } from "url";

const { stat } = fs;

const PATHNAME = Symbol("[PATHNAME]");
const NAME = Symbol("[NAME]");

export default class Path {
  private readonly [PATHNAME]: string;
  private [NAME]?: string;

  /* Constructor */

  public constructor(pathname: string) {
    this[PATHNAME] = resolve(pathname);
  }

  /* Properties */

  public get pathname() {
    return this[PATHNAME];
  }

  public get name() {
    if (this[NAME] === undefined) {
      this[NAME] = basename(this[PATHNAME]);
    }
    return this[NAME];
  }

  public get parent() {
    const path = dirname(this[PATHNAME]);
    return new Path(path);
  }

  /* Methods within Path */

  public toString() {
    return this[PATHNAME];
  }

  public toURL() {
    return new URL(this[PATHNAME], "file:///");
  }

  public resolve(pathname: string) {
    pathname = resolve(this[PATHNAME], pathname);
    return new Path(pathname);
  }

  /* Methods related to Directory & File */

  public async get(pathname?: string): Promise<Directory | File> {
    if (pathname !== undefined) {
      return this.resolve(pathname).get();
    }

    try {
      const stats = await stat(this[PATHNAME]);
      if (stats.isDirectory()) {
        return new Directory(this.pathname);
      }
      if (stats.isFile()) {
        return new File(this.pathname);
      }
    } catch (error) {
      throw new PathError(this, error);
    }

    throw new PathError(this, "Neither a directory nor a file.");
  }

  public async getDirectory(pathname?: string): Promise<Directory> {
    if (pathname !== undefined) {
      return this.resolve(pathname).getDirectory();
    }

    const directory = await this.get();
    if (directory instanceof Directory) {
      return directory;
    }

    throw new PathError(this, "Not a directory");
  }

  public async getFile(pathname?: string): Promise<File> {
    if (pathname !== undefined) {
      return this.resolve(pathname).getFile();
    }

    const file = await this.get();
    if (file instanceof File) {
      return file;
    }

    throw new PathError(this, "Not a file");
  }
}

import PathError from "./PathError";

import Directory from "./Directory";
import File from "./File";
