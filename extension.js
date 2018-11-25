
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
const CFG_QUERY = "dbatoolsQueryTemplate";
const CMD_ID = "extension.dbatoolsSearch";
const STACK_CFG_SECTION = "stackSearch";
const STACK_CFG_QUERY = "stackQueryTemplate";
const STACK_CMD_ID = "extension.stackSearch";

var vscode = require('vscode');

function activate(context) {
  var disposable = vscode.commands.registerTextEditorCommand(CMD_ID, WebSearch);
  var stackdisposable = vscode.commands.registerTextEditorCommand(STACK_CMD_ID, StackWebSearch);
  context.subscriptions.push(stackdisposable);
  context.subscriptions.push(disposable);
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
function StackWebSearch() {
  var selectedText = GetSelectedText();
  if (!selectedText)
    return;

  var uriText = encodeURI(selectedText);

  var stackSearchCfg = vscode.workspace.getConfiguration(STACK_CFG_SECTION);
  const stackQueryTemplate = stackSearchCfg.get(STACK_CFG_QUERY);
  var query = stackQueryTemplate.replace("%SELECTION%", uriText);

  vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(query));
}