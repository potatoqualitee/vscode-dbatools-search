
// Reusable
// Creates the search URL based on the selection and the query template.
function GetSelectedText() {
  const documentText = vscode.window.activeTextEditor.document.getText();
  if (!documentText)
    return '';

  var activeSelection = vscode.window.activeTextEditor.selection;
  if (activeSelection.isEmpty)
    return '';

  const selStartOffset = vscode.window.activeTextEditor.document.offsetAt(activeSelection.start);
  const selEndOffset = vscode.window.activeTextEditor.document.offsetAt(activeSelection.end);

  var selectedText = documentText.slice(selStartOffset, selEndOffset).trim();
  selectedText = selectedText.replace(/\s\s+/g, ' ');
  return selectedText;
}

var vscode = require('vscode');

function activate(context) {
  var dbatoolsdisposable = vscode.commands.registerTextEditorCommand("extension.dbatoolsSearch", dbatoolsSearch);
  var stackdisposable = vscode.commands.registerTextEditorCommand("extension.stackSearch", stackSearch);
  var docsdisposable = vscode.commands.registerTextEditorCommand("extension.docsSearch", docsSearch);
  
  context.subscriptions.push(dbatoolsdisposable);
  context.subscriptions.push(docsdisposable);
  context.subscriptions.push(stackdisposable);
}
exports.activate = activate;

function deactivate() {
}
exports.deactivate = deactivate;

// Launches the search URL in default browser
function dbatoolsSearch() {
  var selectedText = GetSelectedText();
  if (!selectedText)
    return;

  var uriText = encodeURI(selectedText);

  var dbatoolsSearchCfg = vscode.workspace.getConfiguration("dbatoolsSearch");
  const queryTemplate = dbatoolsSearchCfg.get("dbatoolsQueryTemplate");
  var query = queryTemplate.replace("%SELECTION%", uriText);

  vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(query));
}

// I don't know js, forgive me for the duplicated code
function docsSearch() {
  var selectedText = GetSelectedText();
  if (!selectedText)
    return;

  var uriText = encodeURI(selectedText);

  var docsSearchCfg = vscode.workspace.getConfiguration("docsSearch");
  const docsQueryTemplate = docsSearchCfg.get("docsQueryTemplate");
  var query = docsQueryTemplate.replace("%SELECTION%", uriText);

  vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(query));
}

// I don't know js, forgive me for the duplicated code
function stackSearch() {
  var selectedText = GetSelectedText();
  if (!selectedText)
    return;

  var uriText = encodeURI(selectedText);

  var stackSearchCfg = vscode.workspace.getConfiguration("stackSearch");
  const stackQueryTemplate = stackSearchCfg.get("stackQueryTemplate");
  var query = stackQueryTemplate.replace("%SELECTION%", uriText);

  vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(query));
}