
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
  var duckdisposable = vscode.commands.registerTextEditorCommand("extension.duckSearch", duckSearch);
  var thwackdisposable = vscode.commands.registerTextEditorCommand("extension.thwackSearch", thwackSearch);

  context.subscriptions.push(docsdisposable);
  context.subscriptions.push(googledisposable);
  context.subscriptions.push(dbatoolsdisposable);
  context.subscriptions.push(stackdisposable);
  context.subscriptions.push(duckdisposable);
  context.subscriptions.push(thwackdisposable);
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
  const queryTemplate = search.get("queryTemplate.dbatools");
  var query = queryTemplate.replace("-searchphrase-", uriText);

  vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(query));
}

// I don't know js, forgive me for the duplicated code
function docsSearch() {
  var selectedText = GetSelectedText();
  if (!selectedText)
    return;

  var uriText = encodeURI(selectedText);

  var search = vscode.workspace.getConfiguration("search");
  const queryTemplateDocs = search.get("queryTemplate.Docs");
  var query = queryTemplateDocs.replace("-searchphrase-", uriText);

  vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(query));
}

// I don't know js, forgive me for the duplicated code
function googleSearch() {
  var selectedText = GetSelectedText();
  if (!selectedText)
    return;

  var uriText = encodeURI(selectedText);

  var search = vscode.workspace.getConfiguration("search");
  const queryTemplateGoogle = search.get("queryTemplate.Google");
  var query = queryTemplateGoogle.replace("-searchphrase-", uriText);

  vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(query));
}

// I don't know js, forgive me for the duplicated code
function stackSearch() {
  var selectedText = GetSelectedText();
  if (!selectedText)
    return;

  var uriText = encodeURI(selectedText);

  var search = vscode.workspace.getConfiguration("search");
  const queryTemplateStackoverflow = search.get("queryTemplate.Stackoverflow");
  var query = queryTemplateStackoverflow.replace("-searchphrase-", uriText);

  vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(query));
}

// I don't know js, forgive me for the duplicated code
function duckSearch() {
  var selectedText = GetSelectedText();
  if (!selectedText)
    return;

  var uriText = encodeURI(selectedText);

  var search = vscode.workspace.getConfiguration("search");
  const queryTemplateDuckduckgo = search.get("queryTemplate.Duckduckgo");
  var query = queryTemplateDuckduckgo.replace("-searchphrase-", uriText);

  vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(query));
}

// I don't know js, forgive me for the duplicated code
function thwackSearch() {
  var selectedText = GetSelectedText();
  if (!selectedText)
    return;

  var uriText = encodeURI(selectedText);

  var search = vscode.workspace.getConfiguration("search");
  const queryTemplatethwack = search.get("queryTemplate.Thwack");
  var query = queryTemplatethwack.replace("-searchphrase-", uriText);

  vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(query));
}