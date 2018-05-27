'use babel';

import ReactPropHuntView from './react-prop-hunt-view';
import { CompositeDisposable } from 'atom';
import {
  isVariableName,
  traverseAstForParent,
  findOccurrences,
} from './utils';

export default {

  reactPropHuntView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.reactPropHuntView = new ReactPropHuntView(state.reactPropHuntViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.reactPropHuntView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'react-prop-hunt:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.reactPropHuntView.destroy();
  },

  serialize() {
    return {
      reactPropHuntViewState: this.reactPropHuntView.serialize()
    };
  },

  toggle() {
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
          alert("The value you are searching for is probably in the current file.");
        } else {
         // TODO - continue searching other files
         console.log("Continue searching other files");
         const occurrences = findOccurrences(selection, parent, filename);
         console.log('OCCURENCES', occurrences);
        }
      } else {
        throw new Error(`Expected a variable, got ${selection}`);
      }
    }
  }

};
