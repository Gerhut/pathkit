# Pathkit

A node.js file system toolkit. 

## Install

Node.js >= 10.13.0 is required.

```bash
npm install pathkit
```

or

```bash
yarn add pathkit
```

## Usage

```JavaScript

import { Path, File, Directory } from 'pathkit'

// Construct an usr Path object relative the root.
const usr = new Path('/usr')

// Construct a server Path object relative the current directory.
const server = new Path('server')

// Get the File object or Directory object of the src Path object,
// throw errors otherwise.
let serverModule = await server.get()

if (serverModule instanceof Directory) {
    // Get the index.js File object,
    // throw errors if failed.
    serverModule = await serverModule.get('index.js')

    // Read the content
    console.log(await serverModule.read())
}

// Get the Directory object of public,
// throw errors if it's a file.
const publicDirectory = await new Path('public').getDirectory()

for await (const fileOrDirectory of publicDirectory) {
    if (fileOrDirectory instanceof File) {
        console.log(fileOrDirectory.name, ' is a File.')
    } else {
        console.log(fileOrDirectory.name, ' is a Directory.')
    }
}

```

## License

    The MIT License (MIT)

    Copyright (c) 2019 George Cheng <Gerhut@GMail.com>

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
