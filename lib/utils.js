'use babel';
import * as babel from 'babel-core';
import traverse from "babel-traverse";


/*
* traverseAstForParent
* code is a prop name to search for
* filename is the file to search in
* returns the name of a parent React component if the code is a prop to that
* component
*/
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

/*
*  isVariableName
*  returns true if str follows basic character rules to be a variable name
*/
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

/*
* findOccurrences
* name is the prop name whose value we are trying to find
* parentName is the name of the parent component that held the prop name
* originFile is the file we already searched and found parentName in, so ignore it.
*/
export const findOccurrences = (name, parentName, originFile) => {
  const occurrences = {
    noParentComponent: [],
    hasParentComponent: [],
  };
  const dir = atom.project.getDirectories()[0];
  const srcDir = dir.getSubdirectory('src');
  const comps = srcDir.getSubdirectory('components');
  const compFiles = comps.getEntriesSync();

  const reducer = (acc, curr) => {
    if (curr.path !== originFile) {
      acc.push(curr);
    }
    return acc;
  }
  const reducedFiles = compFiles.reduce(reducer, []);
  const mappedFiles = reducedFiles.map((file) => {
    return file.read(false);
  });

  return Promise.all(mappedFiles).then((data) => {
    data.forEach((fileText, i) => {
      if (fileText.includes(name)) {
        const filePath = reducedFiles[i].path;
        const parent = traverseAstForParent(name, filePath);
        if (!parent) {
          if (!occurrences.noParentComponent) {
            occurrences.noParentComponent = [filePath];
          } else {
            occurrences.noParentComponent.push(filePath);
          }
        } else {
          if (!occurrences.hasParentComponent) {
            occurrences.hasParentComponent = [filePath];
          } else {
            occurrences.hasParentComponent.push(filePath);
          }
        }
      }
    });
    return occurrences;
  })
}

/*
*  getValueFromPath
*   return the value passed to a property, code, in filename
*/
export const getValueFromPath = (code, filename) => {
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
        path.node.type === "Identifier" &&
        path.node.name === code
      ) {
        if (
          path.context.parentPath &&
          path.context.parentPath.node &&
          path.context.parentPath.node.value &&
          path.context.parentPath.node.value.name
        ) {
          result = path.context.parentPath.node.value.name;
        }
      }
    }
  });
  return result;
}

export default {
  traverseAstForParent,
  isVariableName,
  findOccurrences,
  getValueFromPath,
};
