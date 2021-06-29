import * as vscode from 'vscode';
import { searcher } from './utils';

export function activate(context: vscode.ExtensionContext) {  
	context.subscriptions.push(vscode.commands.registerTextEditorCommand("extension.docsSearch", () => {
		searcher("Docs");
	  }));
	context.subscriptions.push(vscode.commands.registerTextEditorCommand("extension.googleSearch",() => {
		searcher("Google");
	  }));
	context.subscriptions.push(vscode.commands.registerTextEditorCommand("extension.dbatoolsSearch",() => {
		searcher("dbatools");
	  }));
	context.subscriptions.push(vscode.commands.registerTextEditorCommand("extension.stackSearch",() => {
		searcher("Stackoverflow");
	  }));
	context.subscriptions.push(vscode.commands.registerTextEditorCommand("extension.duckSearch",() => {
		searcher("Duckduckgo");
	  }));
	context.subscriptions.push(vscode.commands.registerTextEditorCommand("extension.thwackSearch",() => {
		searcher("Thwack");
	  }));
	context.subscriptions.push(vscode.commands.registerTextEditorCommand("extension.technetSearch", () => {
		searcher("Technet");
	  }));
	context.subscriptions.push(vscode.commands.registerTextEditorCommand("extension.vscodeApiSearch", () => {
		searcher("VSCodeAPI");
	  }));
	context.subscriptions.push(vscode.commands.registerCommand('extension.vscodeWorkspaceSearch', () => {
		vscode.commands.executeCommand('workbench.action.findInFiles');
	}));
}

export function deactivate() {}