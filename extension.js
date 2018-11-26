
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

// the meat
var vscode = require('vscode');

function activate(context) {
  var docsdisposable = vscode.commands.registerTextEditorCommand("extension.docsSearch", docsSearch);
  var googledisposable = vscode.commands.registerTextEditorCommand("extension.googleSearch", googleSearch);
  var dbatoolsdisposable = vscode.commands.registerTextEditorCommand("extension.dbatoolsSearch", dbatoolsSearch);
  var stackdisposable = vscode.commands.registerTextEditorCommand("extension.stackSearch", stackSearch);

  context.subscriptions.push(docsdisposable);
  context.subscriptions.push(googledisposable);
  context.subscriptions.push(dbatoolsdisposable);
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

  var search = vscode.workspace.getConfiguration("search");
  const queryTemplate = search.get("dbatoolsQueryTemplate");
  var query = queryTemplate.replace("%SELECTION%", uriText);

  vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(query));
}

// I don't know js, forgive me for the duplicated code
function docsSearch() {
  var selectedText = GetSelectedText();
  if (!selectedText)
    return;

  var uriText = encodeURI(selectedText);

  var search = vscode.workspace.getConfiguration("search");
  const docsQueryTemplate = search.get("docsQueryTemplate");
  var query = docsQueryTemplate.replace("%SELECTION%", uriText);

  vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(query));
}

// I don't know js, forgive me for the duplicated code
function googleSearch() {
  var selectedText = GetSelectedText();
  if (!selectedText)
    return;

  var uriText = encodeURI(selectedText);

  var search = vscode.workspace.getConfiguration("search");
  const googleQueryTemplate = search.get("googleQueryTemplate");
  var query = googleQueryTemplate.replace("%SELECTION%", uriText);

  vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(query));
}

// I don't know js, forgive me for the duplicated code
function stackSearch() {
  var selectedText = GetSelectedText();
  if (!selectedText)
    return;

  var uriText = encodeURI(selectedText);

  var search = vscode.workspace.getConfiguration("search");
  const stackQueryTemplate = search.get("stackQueryTemplate");
  var query = stackQueryTemplate.replace("%SELECTION%", uriText);

  vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(query));
}