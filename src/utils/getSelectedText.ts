
import * as vscode from 'vscode';

export function getSelectedText(): string {
	const activeEditor = vscode.window.activeTextEditor;

	var activeSelection = activeEditor!.selection;
	if (activeSelection.isEmpty) {
		let cursorPosition = activeEditor!.selection.start;
		let wordRange = activeEditor!.document.getWordRangeAtPosition(cursorPosition);
		let highlight = activeEditor!.document.getText(wordRange);
		return highlight;
	}

	if (!activeEditor) {
		console.debug("no active editor");
		return '';
	}

	const documentText = activeEditor!.document.getText();
	if (!documentText) {
		console.debug("bailed on getText");
		return '';
	}

	const selStartOffset = activeEditor!.document.offsetAt(activeSelection.start);
	const selEndOffset = activeEditor!.document.offsetAt(activeSelection.end);

	var selectedText = documentText.slice(selStartOffset, selEndOffset).trim();
	selectedText = selectedText.replace(/\s\s+/g, ' ');
	console.debug(`selected text is ${selectedText}`);
	return selectedText;
}