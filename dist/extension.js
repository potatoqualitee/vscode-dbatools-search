"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/extension.ts
var extension_exports = {};
__export(extension_exports, {
  activate: () => activate,
  deactivate: () => deactivate
});
module.exports = __toCommonJS(extension_exports);
var vscode3 = __toESM(require("vscode"));

// src/utils/searcher.ts
var vscode2 = __toESM(require("vscode"));

// src/utils/getSelectedText.ts
var vscode = __toESM(require("vscode"));
function getSelectedText() {
  const activeEditor = vscode.window.activeTextEditor;
  const activeSelection = activeEditor.selection;
  if (activeSelection.isEmpty) {
    let cursorPosition = activeEditor.selection.start;
    let wordRange = activeEditor.document.getWordRangeAtPosition(cursorPosition);
    let highlight = activeEditor.document.getText(wordRange);
    console.debug(`no explicitly selected text. highlighted on ${highlight}`);
    return highlight;
  }
  const documentText = activeEditor.document.getText();
  if (!documentText) {
    console.debug("bailed on getText");
    return "";
  }
  const selStartOffset = activeEditor.document.offsetAt(activeSelection.start);
  const selEndOffset = activeEditor.document.offsetAt(activeSelection.end);
  var selectedText = documentText.slice(selStartOffset, selEndOffset).trim();
  selectedText = selectedText.replace(/\s\s+/g, " ");
  console.debug(`selected text is ${selectedText}`);
  return selectedText;
}

// src/utils/searcher.ts
function searcher(template) {
  var selectedText = getSelectedText();
  if (template === "VSCodeWorkbench") {
    vscode2.commands.executeCommand("workbench.action.findInFiles", {
      query: selectedText,
      triggerSearch: true
    });
  } else {
    if (!selectedText) {
      return;
    }
    var uriText = encodeURI(selectedText);
    var search = vscode2.workspace.getConfiguration("search");
    const qt = `queryTemplate.${template}`;
    const queryTemplate = search.get(`queryTemplate.${template}`);
    var query = queryTemplate.replace("-searchphrase-", uriText);
    console.debug(`query is ${queryTemplate}`);
    vscode2.commands.executeCommand("vscode.open", vscode2.Uri.parse(query));
  }
}

// src/extension.ts
function activate(context) {
  context.subscriptions.push(vscode3.commands.registerTextEditorCommand("extension.docsSearch", () => {
    searcher("Docs");
  }));
  context.subscriptions.push(vscode3.commands.registerTextEditorCommand("extension.googleSearch", () => {
    searcher("Google");
  }));
  context.subscriptions.push(vscode3.commands.registerTextEditorCommand("extension.dbatoolsSearch", () => {
    searcher("dbatools");
  }));
  context.subscriptions.push(vscode3.commands.registerTextEditorCommand("extension.stackSearch", () => {
    searcher("Stackoverflow");
  }));
  context.subscriptions.push(vscode3.commands.registerTextEditorCommand("extension.duckSearch", () => {
    searcher("Duckduckgo");
  }));
  context.subscriptions.push(vscode3.commands.registerTextEditorCommand("extension.thwackSearch", () => {
    searcher("Thwack");
  }));
  context.subscriptions.push(vscode3.commands.registerTextEditorCommand("extension.technetSearch", () => {
    searcher("Technet");
  }));
  context.subscriptions.push(vscode3.commands.registerTextEditorCommand("extension.vscodeApiSearch", () => {
    searcher("VSCodeAPI");
  }));
  context.subscriptions.push(vscode3.commands.registerTextEditorCommand("extension.vscodeWorkspaceSearch", () => {
    searcher("VSCodeWorkbench");
  }));
  context.subscriptions.push(vscode3.commands.registerTextEditorCommand("extension.chatGptSearch", () => {
    searcher("ChatGPT");
  }));
}
function deactivate() {
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate,
  deactivate
});
//# sourceMappingURL=extension.js.map
