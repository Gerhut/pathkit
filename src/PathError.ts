export default class PathError extends Error {
  public static wrap(path: Path, error: NodeJS.ErrnoException) {
    const pathError = new PathError(path, error.message);
    if (error.hasOwnProperty("code")) {
      pathError.code = error.code;
    }
    return pathError;
  }

  public code?: string;

  public constructor(public path: Path, message: string) {
    super(message);

    let className = "PathError";
    if (this.path instanceof Directory) {
      className = "DirectoryError";
    }
    if (this.path instanceof File) {
      className = "FileError";
    }

    this.name = `${className} [${this.path.pathname}]`;
  }
}

import Path from "./Path";

import Directory from "./Directory";
import File from "./File";
