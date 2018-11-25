
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

// Constant strings 
const CFG_SECTION = "dbatoolsSearch";
const CFG_QUERY = "QueryTemplate";
const CMD_ID = "extension.dbatoolsSearch";
// Constant strings 
const SECOND_CFG_SECTION = "dbatoolsBlogSearch";
const SECOND_CFG_QUERY = "SecondQueryTemplate";
const SECOND_CMD_ID = "extension.dbatoolsBlogSearch";

var vscode = require('vscode');

function activate(context) {

  var disposable = vscode.commands.registerTextEditorCommand(CMD_ID, WebSearch);
  var seconddisposable = vscode.commands.registerTextEditorCommand(SECOND_CMD_ID, SecondWebSearch);

  context.subscriptions.push(disposable);
  context.subscriptions.push(seconddisposable);
}
exports.activate = activate;

function deactivate() {
}
exports.deactivate = deactivate;

// Launches the search URL in default browser
function WebSearch() {
  var selectedText = GetSelectedText();
  if (!selectedText)
    return;

  var uriText = encodeURI(selectedText);

  var dbatoolsSearchCfg = vscode.workspace.getConfiguration(CFG_SECTION);
  const queryTemplate = dbatoolsSearchCfg.get(CFG_QUERY);
  var query = queryTemplate.replace("%SELECTION%", uriText);

  vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(query));
}

// I don't knwo js, forgive me for the duplicated code
function SecondWebSearch() {
  var selectedText = GetSelectedText();
  if (!selectedText)
    return;

  var uriText = encodeURI(selectedText);

  var dbatoolsBlogSearchCfg = vscode.workspace.getConfiguration(SECOND_CFG_SECTION);
  const secondqueryTemplate = dbatoolsBlogSearchCfg.get(SECOND_CFG_QUERY);
  var query = secondqueryTemplate.replace("%SELECTION%", uriText);

  vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(query));
}