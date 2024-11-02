/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(3), exports);


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.searcher = searcher;
const vscode = __webpack_require__(1);
const getSelectedText_1 = __webpack_require__(4);
function searcher(template) {
    var selectedText = (0, getSelectedText_1.getSelectedText)();
    if (template === "VSCodeWorkbench") {
        vscode.commands.executeCommand('workbench.action.findInFiles', {
            query: selectedText,
            triggerSearch: true
        });
    }
    else {
        if (!selectedText) {
            return;
        }
        var uriText = encodeURI(selectedText);
        var search = vscode.workspace.getConfiguration("search");
        const qt = `queryTemplate.${template}`;
        const queryTemplate = search.get(`queryTemplate.${template}`);
        var query = queryTemplate.replace("-searchphrase-", uriText);
        console.debug(`query is ${queryTemplate}`);
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(query));
    }
}


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getSelectedText = getSelectedText;
const vscode = __webpack_require__(1);
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
        return '';
    }
    const selStartOffset = activeEditor.document.offsetAt(activeSelection.start);
    const selEndOffset = activeEditor.document.offsetAt(activeSelection.end);
    var selectedText = documentText.slice(selStartOffset, selEndOffset).trim();
    selectedText = selectedText.replace(/\s\s+/g, ' ');
    console.debug(`selected text is ${selectedText}`);
    return selectedText;
}


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __webpack_require__(1);
const utils_1 = __webpack_require__(2);
function activate(context) {
    context.subscriptions.push(vscode.commands.registerTextEditorCommand("extension.docsSearch", () => {
        (0, utils_1.searcher)("Docs");
    }));
    context.subscriptions.push(vscode.commands.registerTextEditorCommand("extension.googleSearch", () => {
        (0, utils_1.searcher)("Google");
    }));
    context.subscriptions.push(vscode.commands.registerTextEditorCommand("extension.dbatoolsSearch", () => {
        (0, utils_1.searcher)("dbatools");
    }));
    context.subscriptions.push(vscode.commands.registerTextEditorCommand("extension.stackSearch", () => {
        (0, utils_1.searcher)("Stackoverflow");
    }));
    context.subscriptions.push(vscode.commands.registerTextEditorCommand("extension.duckSearch", () => {
        (0, utils_1.searcher)("Duckduckgo");
    }));
    context.subscriptions.push(vscode.commands.registerTextEditorCommand("extension.thwackSearch", () => {
        (0, utils_1.searcher)("Thwack");
    }));
    context.subscriptions.push(vscode.commands.registerTextEditorCommand("extension.technetSearch", () => {
        (0, utils_1.searcher)("Technet");
    }));
    context.subscriptions.push(vscode.commands.registerTextEditorCommand("extension.vscodeApiSearch", () => {
        (0, utils_1.searcher)("VSCodeAPI");
    }));
    context.subscriptions.push(vscode.commands.registerTextEditorCommand("extension.vscodeWorkspaceSearch", () => {
        (0, utils_1.searcher)("VSCodeWorkbench");
    }));
}
function deactivate() { }

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map