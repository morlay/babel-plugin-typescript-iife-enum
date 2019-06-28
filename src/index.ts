import { template, types } from "@babel/core";
import { Node, NodePath } from "@babel/traverse";

const buildEnumWrapper = template(`
const ID = (function () {
  ENUM;
  return ID
})()
`);

const IIEF_ENUM = "__IIFE_ENUM__";

export default () => {
  return {
    name: "typescript-iife-enum",
    inherits: require("@babel/plugin-syntax-typescript").default,
    visitor: {
      TSEnumDeclaration(path: NodePath<types.TSEnumDeclaration>) {
        if (
          path.node.leadingComments &&
          path.node.leadingComments.toString().indexOf(IIEF_ENUM) >= -1
        ) {
          return;
        }

        const nextNode = buildEnumWrapper({
          ID: types.clone(path.node.id),
          ENUM: {
            ...path.node,
            leadingComments: [
              ...(path.node.leadingComments ? path.node.leadingComments : []),
              {
                type: "LineComponent",
                value: IIEF_ENUM,
              },
            ],
          },
        });

        path.replaceWith(nextNode as Node);
      },
    },
  };
};
