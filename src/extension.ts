import * as vscode from 'vscode';
import * as cheerio from 'cheerio';

export function activate(context: vscode.ExtensionContext) {
    const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBar.command = 'estcequonmetenprodaujourdhui.showStatus';
    statusBar.text = '$(rocket) Can I deploy to prod today?';
    statusBar.show();

    const disposable = vscode.commands.registerCommand('estcequonmetenprodaujourdhui.showStatus', async () => {
        try {
            const response = await fetch('https://www.estcequonmetenprodaujourdhui.info/');
            const text = await response.text();
            const $ = cheerio.load(text);
            const message = $('body>div>strong').text();
            statusBar.text = `$(rocket) ${message}`;
            vscode.window.showInformationMessage(message);
        } catch (error) {
            vscode.window.showErrorMessage('Failed to fetch deployment status.');
        }
    });

    context.subscriptions.push(statusBar);
    context.subscriptions.push(disposable);
}

export function deactivate() {}
