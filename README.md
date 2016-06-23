# depem

[![Build Status](https://travis-ci.org/confuser/depem.png?branch=master)](https://travis-ci.org/confuser/depem)
[![Coverage Status](https://coveralls.io/repos/confuser/depem/badge.png?branch=master)](https://coveralls.io/r/confuser/depem?branch=master)

Detects, installs and defines package.json dependencies based on require statements from .js files in current working directory and subdirectories; great for quick prototyping!

## Installation
```
npm install -g depem
```

## Usage
```
[jamesm@Jamess-MacBook-Air depem ]$ depem
Executing "npm i --save glob detective lodash.uniq async.concat is-builtin-module"
```

Delayed by 1 second to allow for cancellation
