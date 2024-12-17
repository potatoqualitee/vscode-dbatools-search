import * as vscode from 'vscode';
import { getSelectedText } from './getSelectedText';

async function getGitInfo(): Promise<{ repo?: string; author?: string }> {
    try {
        const gitExtension = vscode.extensions.getExtension('vscode.git')?.exports;
        if (!gitExtension) {
            return {};
        }

        const api = gitExtension.getAPI(1);
        if (!api || !api.repositories || api.repositories.length === 0) {
            return {};
        }

        const repository = api.repositories[0];
        if (!repository || !repository.state.remotes || repository.state.remotes.length === 0) {
            return {};
        }

        const remoteUrl = await repository.state.remotes[0]?.fetchUrl || '';
        if (!remoteUrl) {
            return {};
        }

        // Extract owner/repo from git URL (handles both HTTPS and SSH formats)
        const match = remoteUrl.match(/[:/]([^/]+)\/([^/.]+)(?:\.git)?$/);
        if (match) {
            return {
                author: match[1],
                repo: `${match[1]}/${match[2]}`
            };
        }
    } catch (error) {
        console.error('Error getting git info:', error);
    }
    return {};
}

function getLanguageFromFile(document: vscode.TextDocument): string {
    const languageId = document.languageId;
    // Map VS Code language IDs to GitHub search language names
    const languageMap: { [key: string]: string } = {
        'powershell': 'PowerShell',
        'typescript': 'TypeScript',
        'javascript': 'JavaScript',
        'python': 'Python',
        'csharp': 'C#',
        'java': 'Java',
        'cpp': 'C++',
        'c': 'C',
        'go': 'Go',
        'rust': 'Rust',
        'ruby': 'Ruby',
        'php': 'PHP',
        'swift': 'Swift',
        'kotlin': 'Kotlin',
        'scala': 'Scala',
        'dart': 'Dart',
        'r': 'R',
        'sql': 'SQL',
        'perl': 'Perl',
        'lua': 'Lua',
        'haskell': 'Haskell',
        'vue': 'Vue',
        'react': 'React',
        'angular': 'Angular',
        'html': 'HTML',
        'css': 'CSS',
        'scss': 'SCSS',
        'less': 'Less',
        'shell': 'Shell',
        'bash': 'Bash',
        'dockerfile': 'Dockerfile',
        'yaml': 'YAML',
        'json': 'JSON',
        'markdown': 'Markdown',
        'xml': 'XML'
    };
    return languageMap[languageId] || languageId;
}

export async function searcher(template: string) {
    const selectedText = getSelectedText();
    if (!selectedText) {
        return;
    }

    if (template === "VSCodeWorkbench") {
        vscode.commands.executeCommand('workbench.action.findInFiles', {
            query: selectedText,
            triggerSearch: true
        });
        return;
    }

    const search = vscode.workspace.getConfiguration("search");
    let queryTemplate: string = search.get(`queryTemplate.${template}`) || '';
    const limitToLanguage: boolean = search.get('limitToLanguage') || false;
    const uriText = encodeURIComponent(selectedText);
    let query = queryTemplate;

    // Handle GitHub-specific templates
    if (template.startsWith('GitHub')) {
        let searchText = uriText;

        // Add language filter if enabled and we have a language
        if (limitToLanguage && vscode.window.activeTextEditor) {
            const language = getLanguageFromFile(vscode.window.activeTextEditor.document);
            if (language) {
                searchText = `${searchText}+language:${language}`;
            }
        }

        // Only try to get git info for repo and author searches
        if (template === 'GitHubRepo' || template === 'GitHubAuthor') {
            const gitInfo = await getGitInfo();

            if (template === 'GitHubRepo' && gitInfo.repo) {
                query = query.replace('-repo-', gitInfo.repo);
            } else if (template === 'GitHubAuthor' && gitInfo.author) {
                query = query.replace('-author-', gitInfo.author);
            } else {
                // Fall back to global GitHub search if we can't get git info
                queryTemplate = search.get('queryTemplate.GitHub') || '';
                query = queryTemplate;
            }
        }

        query = query.replace('-searchphrase-', searchText);
    } else {
        // Standard search template
        query = query.replace('-searchphrase-', uriText);
    }

    console.debug(`query is ${query}`);
    vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(query));
}