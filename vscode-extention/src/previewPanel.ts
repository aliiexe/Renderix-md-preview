/**
 * @fileoverview Preview panel for displaying Markdown preview
 */

import * as vscode from 'vscode';
import * as path from 'path';
import { renderMarkdown, type Theme } from '@renderix/core';

/**
 * Manages the Markdown preview webview panel
 */
export class PreviewPanel {
  public static currentPanel: PreviewPanel | undefined;
  private readonly _panel: vscode.WebviewPanel;
  private readonly _extensionUri: vscode.Uri;
  private _document: vscode.TextDocument | null;
  private _disposables: vscode.Disposable[] = [];

  private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri, document: vscode.TextDocument | null) {
    this._panel = panel;
    this._extensionUri = extensionUri;
    this._document = document;

    // Set the webview's initial html content
    this._update();

    // Listen for when the panel is disposed
    // This happens when the user closes the panel or when the panel is closed programmatically
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

    // Handle messages from the webview
    this._panel.webview.onDidReceiveMessage(
      (message) => {
        switch (message.command) {
          case 'refresh':
            this._update();
            return;
        }
      },
      null,
      this._disposables
    );

    // Listen for document changes
    vscode.workspace.onDidSaveTextDocument(
      (document) => {
        if (this._document && document.uri.toString() === this._document.uri.toString()) {
          this._update();
        }
      },
      null,
      this._disposables
    );

    // Listen for document content changes (optional - for live preview)
    vscode.workspace.onDidChangeTextDocument(
      (event) => {
        if (this._document && event.document.uri.toString() === this._document.uri.toString()) {
          // Debounce updates to avoid too frequent refreshes
          // For now, we only update on save (TASK 2.3 requirement)
        }
      },
      null,
      this._disposables
    );
  }

  public static createOrShow(extensionUri: vscode.Uri, document: vscode.TextDocument) {
    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;

    // If we already have a panel, reuse it and update the document
    if (PreviewPanel.currentPanel) {
      PreviewPanel.currentPanel._panel.reveal(column);
      // Update document reference and refresh
      PreviewPanel.currentPanel._document = document;
      PreviewPanel.currentPanel._updateTitle();
      PreviewPanel.currentPanel._update();
      return;
    }

    // Otherwise, create a new panel
    const panel = vscode.window.createWebviewPanel(
      'renderixPreview',
      `Renderix Preview: ${path.basename(document.fileName)}`,
      column || vscode.ViewColumn.Two,
      {
        enableScripts: false, // No scripts needed - security hardening
        localResourceRoots: [extensionUri],
        retainContextWhenHidden: true,
      }
    );

    PreviewPanel.currentPanel = new PreviewPanel(panel, extensionUri, document);
  }

  /**
   * Shows a placeholder when no Markdown file is active
   */
  public static showPlaceholder(extensionUri: vscode.Uri) {
    const column = vscode.ViewColumn.Two;
    
    // Reuse existing panel if available
    if (PreviewPanel.currentPanel) {
      PreviewPanel.currentPanel._panel.reveal(column);
      PreviewPanel.currentPanel._panel.webview.html = PreviewPanel.currentPanel._getPlaceholderHtml();
      return;
    }

    // Create a new panel for placeholder
    const panel = vscode.window.createWebviewPanel(
      'renderixPreview',
      'Renderix Preview',
      column,
      {
        enableScripts: false,
        localResourceRoots: [extensionUri],
        retainContextWhenHidden: true,
      }
    );

    const placeholderPanel = new PreviewPanel(panel, extensionUri, null as any);
    placeholderPanel._panel.webview.html = placeholderPanel._getPlaceholderHtml();
  }

  private _updateTitle() {
    if (this._document) {
      this._panel.title = `Renderix Preview: ${path.basename(this._document.fileName)}`;
    } else {
      this._panel.title = 'Renderix Preview';
    }
  }

  private _getPlaceholderHtml(): string {
    const nonce = this._generateNonce();
    const theme = this._getVSCodeTheme();
    const isDark = theme === 'dark';
    
    const bgColor = isDark ? '#0d1117' : '#ffffff';
    const textColor = isDark ? '#c9d1d9' : '#24292e';
    const mutedColor = isDark ? '#8b949e' : '#6a737d';
    const borderColor = isDark ? '#30363d' : '#e1e4e8';
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content="
    default-src 'none';
    style-src 'nonce-${nonce}';
    script-src 'none';
  ">
  <style nonce="${nonce}">
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      background-color: ${bgColor};
      color: ${textColor};
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
    .placeholder-container {
      text-align: center;
      max-width: 500px;
      padding: 40px;
    }
    .placeholder-icon {
      font-size: 64px;
      margin-bottom: 24px;
      opacity: 0.5;
    }
    .placeholder-title {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 12px;
      color: ${textColor};
    }
    .placeholder-text {
      font-size: 14px;
      color: ${mutedColor};
      line-height: 1.6;
      margin-bottom: 24px;
    }
    .placeholder-hint {
      font-size: 13px;
      color: ${mutedColor};
      padding: 12px;
      background-color: ${isDark ? '#161b22' : '#f6f8fa'};
      border-radius: 6px;
      border: 1px solid ${borderColor};
    }
    code {
      font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
      font-size: 12px;
      padding: 2px 6px;
      background-color: ${isDark ? '#21262d' : '#e1e4e8'};
      border-radius: 3px;
    }
  </style>
</head>
<body>
  <div class="placeholder-container">
    <div class="placeholder-icon">📄</div>
    <div class="placeholder-title">No Markdown file open</div>
    <div class="placeholder-text">
      Open a Markdown file and use the command <code>Renderix: Open Markdown Preview</code> to see the preview.
    </div>
    <div class="placeholder-hint">
      💡 Tip: Press <code>Ctrl+Shift+P</code> (or <code>Cmd+Shift+P</code> on Mac) and search for "Renderix"
    </div>
  </div>
</body>
</html>`;
  }

  /**
   * Updates the document and refreshes the preview
   */
  public updateDocument(document: vscode.TextDocument) {
    this._document = document;
    this._updateTitle();
    this._update();
  }

  /**
   * Shows the placeholder HTML
   */
  public showPlaceholder() {
    this._panel.webview.html = this._getPlaceholderHtml();
  }

  public dispose() {
    PreviewPanel.currentPanel = undefined;

    // Clean up our resources
    this._panel.dispose();

    while (this._disposables.length) {
      const x = this._disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  private _update() {
    if (!this._document) {
      this._panel.webview.html = this._getPlaceholderHtml();
      return;
    }

    // Show loading state
    this._panel.webview.html = this._getLoadingHtml();

    // Use setTimeout to allow the loading state to render
    setTimeout(() => {
      if (!this._document) {
        this._panel.webview.html = this._getPlaceholderHtml();
        return;
      }

      try {
        const markdown = this._document.getText();
        const theme = this._getVSCodeTheme();
        
        const result = renderMarkdown(markdown, {
          theme: theme,
          highlightCode: true,
          sanitize: true,
        });

        this._panel.webview.html = this._getHtmlForWebview(result.html, result.css);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        this._panel.webview.html = this._getErrorHtml(errorMessage);
      }
    }, 10);
  }

  private _getVSCodeTheme(): Theme {
    const colorTheme = vscode.window.activeColorTheme;
    return colorTheme.kind === vscode.ColorThemeKind.Dark ? 'dark' : 'light';
  }

  private _getHtmlForWebview(html: string, css: string): string {
    // Generate a random nonce for CSP (VS Code webviews support nonces)
    const nonce = this._generateNonce();
    
    // Content Security Policy - strict, no unsafe-inline
    // Using nonce for styles to avoid unsafe-inline
    const csp = `
      <meta http-equiv="Content-Security-Policy" content="
        default-src 'none';
        style-src 'nonce-${nonce}';
        script-src 'none';
        img-src * data: https:;
        font-src 'none';
        connect-src 'none';
        frame-src 'none';
        object-src 'none';
        base-uri 'none';
        form-action 'none';
      ">
    `;

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${csp}
  <style nonce="${nonce}">
    ${css}
  </style>
</head>
<body>
  <div class="renderix-preview">
    ${html}
  </div>
</body>
</html>`;
  }

  /**
   * Generates a cryptographically random nonce for CSP
   */
  private _generateNonce(): string {
    // Generate a random nonce for CSP
    // Using crypto if available, otherwise fallback to Math.random
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      const array = new Uint8Array(16);
      crypto.getRandomValues(array);
      return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    }
    // Fallback for environments without crypto
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  private _getLoadingHtml(): string {
    const nonce = this._generateNonce();
    const theme = this._getVSCodeTheme();
    const isDark = theme === 'dark';
    
    const bgColor = isDark ? '#0d1117' : '#ffffff';
    const textColor = isDark ? '#c9d1d9' : '#24292e';
    const spinnerColor = isDark ? '#58a6ff' : '#0366d6';
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content="
    default-src 'none';
    style-src 'nonce-${nonce}';
    script-src 'none';
  ">
  <style nonce="${nonce}">
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      background-color: ${bgColor};
      color: ${textColor};
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
    .loading-container {
      text-align: center;
    }
    .spinner {
      border: 3px solid ${isDark ? '#30363d' : '#e1e4e8'};
      border-top: 3px solid ${spinnerColor};
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
      margin: 0 auto 16px;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .loading-text {
      font-size: 14px;
      opacity: 0.8;
    }
  </style>
</head>
<body>
  <div class="loading-container">
    <div class="spinner"></div>
    <div class="loading-text">Rendering preview...</div>
  </div>
</body>
</html>`;
  }

  private _getErrorHtml(error: string): string {
    const nonce = this._generateNonce();
    const theme = this._getVSCodeTheme();
    const isDark = theme === 'dark';
    
    const bgColor = isDark ? '#0d1117' : '#ffffff';
    const textColor = isDark ? '#c9d1d9' : '#24292e';
    const errorColor = isDark ? '#f85149' : '#d32f2f';
    const errorBg = isDark ? '#490202' : '#ffebee';
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content="
    default-src 'none';
    style-src 'nonce-${nonce}';
    script-src 'none';
  ">
  <style nonce="${nonce}">
    body {
      margin: 0;
      padding: 20px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      background-color: ${bgColor};
      color: ${textColor};
    }
    h1 {
      color: ${errorColor};
      margin-top: 0;
    }
    pre {
      background: ${errorBg};
      padding: 16px;
      border-radius: 6px;
      overflow-x: auto;
      border-left: 4px solid ${errorColor};
    }
  </style>
</head>
<body>
  <h1>Error rendering Markdown</h1>
  <pre>${this._escapeHtml(error)}</pre>
</body>
</html>`;
  }

  private _escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
}
