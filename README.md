## babel-plugin-typescript-iife-enum

[![Build Status](https://img.shields.io/travis/morlay/babel-plugin-typescript-iife-enum.svg?style=flat-square)](https://travis-ci.org/morlay/babel-plugin-typescript-iife-enum)
[![NPM](https://img.shields.io/npm/v/babel-plugin-typescript-iife-enum.svg?style=flat-square)](https://npmjs.org/package/babel-plugin-typescript-iife-enum)
[![Dependencies](https://img.shields.io/david/morlay/babel-plugin-typescript-iife-enum.svg?style=flat-square)](https://david-dm.org/morlay/babel-plugin-typescript-iife-enum)
[![License](https://img.shields.io/npm/l/babel-plugin-typescript-iife-enum.svg?style=flat-square)](https://npmjs.org/package/babel-plugin-typescript-iife-enum)

### Purpose

A TypeScript transform to wrapper enum in IIFE.

### Purpose

For now TypeScript will transform enum from

```ts
enum Test {
    Key = 1
}
```
to

```ts
var Test;
(function (Test) {
    Test[Test["Key"] = 1] = "Key";
})(Test || (Test = {}));
```

This result is not friendly for uglyify.

So just wrapper IIFE for enum

```
const Test = (() => {
    enum Test {
        Key = 1
    }
  
    return Test
})
```

## Notice

must put this plugin before `@babel/plugin-transform-typescript`