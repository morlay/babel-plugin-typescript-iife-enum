import { transform } from "@babel/core";
import pluginTypescriptIIFEEnum from "../";

const cases = [
  {
    title: "enum",
    src: `enum Test {
  A,
  B
}`,
    dest: `
const Test = function () {
  //__IIFE_ENUM__
  let Test;

  (function (Test) {
    Test[Test["A"] = 0] = "A";
    Test[Test["B"] = 1] = "B";
  })(Test || (Test = {}));

  return Test;
}();
`,
  },
  {
    title: "export enum",
    src: `export enum Test {
  A,
  B
}`,
    dest: `
export const Test = function () {
  //__IIFE_ENUM__
  let Test;

  (function (Test) {
    Test[Test["A"] = 0] = "A";
    Test[Test["B"] = 1] = "B";
  })(Test || (Test = {}));

  return Test;
}();
`,
  },
];

describe("test cases", () => {
  cases.forEach((caseItem) => {
    ((caseItem as any).only ? it.only : it)(caseItem.title, () => {
      const src = transform(caseItem.src, {
        plugins: [
          pluginTypescriptIIFEEnum,
          "@babel/plugin-transform-typescript",
        ],
      })!.code;

      const dest = transform(caseItem.dest, {
        plugins: [],
      })!.code;

      expect(src || "").toEqual(dest || "");
    });
  });
});
