import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBar.command = 'estcequonmetenprodaujourdhui.showStatus';
    statusBar.text = '$(rocket) Can I deploy to prod today?';
    statusBar.show();

    const disposable = vscode.commands.registerCommand('estcequonmetenprodaujourdhui.showStatus', () => {
        const canDeploy = Math.random() >= 0.5;
        const message = canDeploy ? 'Yes, you can deploy to production!' : 'No, you cannot deploy to production!';
        statusBar.text = canDeploy ? '$(rocket) Can deploy to prod' : '$(rocket) Cannot deploy to prod';
        vscode.window.showInformationMessage(message);
    });

    context.subscriptions.push(statusBar);
    context.subscriptions.push(disposable);
}

export function deactivate() {}
