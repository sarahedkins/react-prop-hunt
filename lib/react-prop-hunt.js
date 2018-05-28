'use babel';

import { CompositeDisposable } from 'atom';
import {
  isVariableName,
  traverseAstForParent,
  findOccurrences,
  getValueFromPath,
} from './utils';

export default {

  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that hunts for value
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'react-prop-hunt:hunt': () => this.hunt()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
    this.reactPropHuntView.destroy();
  },

  hunt() {
    let editor;
    if (editor = atom.workspace.getActiveTextEditor()) {
      const selection = editor.getSelectedText();
      const buffer = editor.getBuffer();
      const filename = buffer.getUri();

      const grammar = editor.getGrammar();
      if (grammar.name !== "JavaScript") {
        throw new Error(`Expected JavaScript, got ${grammar.name}`);
      }

      const isVar = isVariableName(selection);
      let parent;
      if (isVar) {
        const parent = traverseAstForParent(selection, filename);
        if (!parent) {
          // TODO - identify the value in the current file.
          atom.notifications.addInfo("The value you are searching for is probably in the current file.");
        } else {
         const occurrences = findOccurrences(selection, parent, filename);
         occurrences.then((obj) => {
           if (obj.noParentComponent) {
             obj.noParentComponent.forEach(path => {
               const value = getValueFromPath(selection, path);
               atom.notifications.addInfo(`The value of ${selection} is ${value}, as identified in file ${path}.`);
             });
           }
         })
        }
      } else {
        throw new Error(`Expected a variable, got ${selection}`);
      }
    }
  }

};
