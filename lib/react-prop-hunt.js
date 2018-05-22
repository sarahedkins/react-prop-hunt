'use babel';

import ReactPropHuntView from './react-prop-hunt-view';
import { CompositeDisposable } from 'atom';
import { isVariableName, testBabel } from './utils';

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
      console.log("buffer:", buffer);
      const grammar = editor.getGrammar();
      if (grammar.name !== "JavaScript") {
        throw new Error(`Expected JavaScript, got ${grammar.name}`);
      }

      // testBabel(selection);
      // const isVar = isVariableName(selection);
      // if (isVar) {
      //   const matcher = (res) => {
      //     console.log("res", res);
      //     console.log("res.matchText", res.matchText);
      //   };
      //   const regex = new RegExp(selection, "g");
      //   const opts = {
      //     leadingContextLineCount: 1,
      //     trailingContextLineCount: 1,
      //   }
      //   const matches = editor.scan(regex, opts, matcher);
      // }
    }
  }

};
