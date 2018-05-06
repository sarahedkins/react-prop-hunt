'use babel';
// import { transform } from 'babel-core';
import * as bc from 'babel-core';

export const testBabel = (code) => {
  console.log("code:", code);
  console.log("bc", bc);
  // const result = transform(code);
  // console.log("result", result);
  // console.log("result.code", result.code);
  // console.log("result.map", result.map);
  // console.log("result.ast", result.ast);
  // // console.log("result.ast.program.body[0].expression.type", result.ast.program.body[0].expression.type);
  // console.log("parse:", parse(code));
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

export const isRenamed = (name, str) => {
  if (str.indexOf(name) < 0) return;
  // TODO
}

export default isVariableName;
