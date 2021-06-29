import * as vscode from 'vscode';
import { getSelectedText } from './getSelectedText';

export function searcher(template: string) {
	var selectedText = getSelectedText();

	if (template === "VSCodeWorkbench") {
		vscode.commands.executeCommand('workbench.action.findInFiles', {
			query: selectedText,
			triggerSearch: true
		});
	} else {
		if (!selectedText) {
			return;
		}
		var uriText = encodeURI(selectedText);
		var search = vscode.workspace.getConfiguration("search");
		const qt = `queryTemplate.${template}`;
		const queryTemplate: any = search.get(`queryTemplate.${template}`);
		var query = queryTemplate.replace("-searchphrase-", uriText);
		console.debug(`query is ${queryTemplate}`);
		vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(query));
	}
}