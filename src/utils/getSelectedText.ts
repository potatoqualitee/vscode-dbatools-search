
import * as vscode from 'vscode';

export function getSelectedText(): string {
	const activeEditor = vscode.window.activeTextEditor;
    if (!activeEditor) {
		console.debug("no active editor");
        return '';
    }

	const documentText = activeEditor!.document.getText();
	if (!documentText) {
	  console.debug("bailed on getText");
	  return '';
	}

	var activeSelection = activeEditor!.selection;
	if (activeSelection.isEmpty) {
	  console.debug("bailed on selection");
	  return '';
	}
  
	const selStartOffset = activeEditor!.document.offsetAt(activeSelection.start);
	const selEndOffset = activeEditor!.document.offsetAt(activeSelection.end);
  
	var selectedText = documentText.slice(selStartOffset, selEndOffset).trim();
	selectedText = selectedText.replace(/\s\s+/g, ' ');
	console.debug(`selected text is ${selectedText}`);
	return selectedText;
  }