'use babel';
import * as babel from 'babel-core';
import traverse from "babel-traverse";

export const traverseAstForParent = (code, filename) => {
  let result;
  const options = {
    presets: ['env', 'react'],
    ast: true,
  };
  const ast = babel.transformFileSync(filename, options).ast;
  traverse(ast, {
    enter(path) {
      if (
        path.node &&
        path.node.type === "VariableDeclarator" &&
        path.node.id &&
        path.node.id.name === code  &&
        path.node.init &&
        path.node.init.object &&
        path.node.init.object.name === "_ref" &&
        path.context.scope &&
        path.context.scope.bindings._ref &&
        path.context.scope.bindings._ref.path.parent.type === "FunctionExpression"
      ) {
        result = path.context.scope.bindings._ref.path.parent.id.name;
      }
    }
  });
  return result;
}

export const isVariableName = (str) => {
  if (!str) return false;
  const first = str.charCodeAt(0);
  if (!(first > 64 && first < 91) &&  // upper alpha (A-Z)
      !(first > 96 && first < 123)) { // lower alpha (a-z)
        return false; // vars must start with alpha
  }
  for (let i = 1; i < str.length; i++) {
    code = str.charCodeAt(i);
    if (!(code > 47 && code < 58) && // numeric (0-9)
        !(code > 64 && code < 91) && // upper alpha (A-Z)
        !(code > 96 && code < 123)) { // lower alpha (a-z)
      return false;
    }
  }
  return true;
}

export default isVariableName;
