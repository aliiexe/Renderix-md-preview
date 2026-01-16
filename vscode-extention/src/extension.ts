/**
 * @fileoverview VS Code extension entry point for Renderix Markdown Preview
 */

import * as vscode from 'vscode';
import { PreviewPanel } from './previewPanel';

/**
 * Activates the extension
 */
export function activate(context: vscode.ExtensionContext) {
  console.log('Renderix Markdown Preview extension is now active');

  // Register the open preview command
  const openPreviewCommand = vscode.commands.registerCommand(
    'renderix.openPreview',
    () => {
      const activeEditor = vscode.window.activeTextEditor;
      
      if (!activeEditor) {
        // Show placeholder if no editor is active
        PreviewPanel.showPlaceholder(context.extensionUri);
        return;
      }

      const document = activeEditor.document;
      if (document.languageId !== 'markdown') {
        vscode.window.showWarningMessage('Active file is not a Markdown file. Please open a .md file first.');
        // Still show placeholder
        PreviewPanel.showPlaceholder(context.extensionUri);
        return;
      }

      // Create or reveal the preview panel
      PreviewPanel.createOrShow(context.extensionUri, document);
    }
  );

  context.subscriptions.push(openPreviewCommand);

  // Listen for active editor changes to handle file switching
  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor((editor) => {
      if (PreviewPanel.currentPanel) {
        if (editor && editor.document.languageId === 'markdown') {
          // Switch to the new Markdown file
          PreviewPanel.currentPanel.updateDocument(editor.document);
        } else if (!editor) {
          // No active editor - show placeholder
          PreviewPanel.currentPanel.showPlaceholder();
        }
      }
    })
  );

  // Auto-open preview when a Markdown file is opened (optional)
  // Uncomment if you want automatic preview on file open
  // vscode.workspace.onDidOpenTextDocument((document) => {
  //   if (document.languageId === 'markdown') {
  //     PreviewPanel.createOrShow(context.extensionUri, document);
  //   }
  // });
}

/**
 * Deactivates the extension
 */
export function deactivate() {
  console.log('Renderix Markdown Preview extension is now deactivated');
}
