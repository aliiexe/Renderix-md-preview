# Renderix Markdown Preview

A beautiful, secure Markdown preview extension for VS Code with syntax highlighting and automatic theme support.

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)
![VS Code](https://img.shields.io/badge/VS%20Code-1.74%2B-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## Features

- 🎨 **Automatic Theme Support**: Seamlessly matches VS Code's light/dark theme
- 💡 **Syntax Highlighting**: Code blocks are beautifully highlighted using highlight.js with auto-detection
- 🔒 **Secure by Default**: HTML output is sanitized using DOMPurify, strict CSP policy
- ⚡ **Fast Updates**: Preview refreshes automatically when you save your Markdown file
- 📱 **Side-by-Side Preview**: Opens preview panel alongside your editor
- 🎯 **Smart File Switching**: Automatically updates when switching between Markdown files
- ⏳ **Loading States**: Smooth loading indicators for better UX
- 🛡️ **Production Ready**: Hardened security with nonce-based CSP, no unsafe-inline

## Quick Start

1. Open a Markdown file (`.md`) in VS Code
2. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
3. Type "Renderix: Open Markdown Preview"
4. The preview opens in a side panel

The preview automatically updates when you save your Markdown file!

## Usage

### Opening Preview

- **Command Palette**: `Ctrl+Shift+P` → "Renderix: Open Markdown Preview"
- The preview panel opens side-by-side with your editor
- Panel title shows the current file name

### Features in Action

- **Auto-refresh**: Save your `.md` file and watch the preview update instantly
- **Theme sync**: Switch VS Code theme and the preview adapts automatically
- **File switching**: Open different Markdown files and the preview updates
- **Syntax highlighting**: Code blocks are automatically detected and highlighted

## Requirements

- VS Code 1.74.0 or higher
- Node.js 18.0.0 or higher (for development)

## Security

This extension prioritizes security:

- ✅ Strict Content Security Policy (CSP)
- ✅ No unsafe-inline scripts or styles
- ✅ HTML sanitization enabled by default
- ✅ Scripts disabled in webview
- ✅ Nonce-based style injection

## What's Supported

### Markdown Features
- Headers (H1-H6)
- Bold, italic, strikethrough
- Lists (ordered and unordered)
- Links and images
- Code blocks with syntax highlighting
- Blockquotes
- Tables
- Horizontal rules
- GitHub-flavored Markdown

### Syntax Highlighting
- Auto-detects language from code fence
- Falls back to auto-detection if language not specified
- Supports 190+ languages via highlight.js

## Development

### Building

```bash
npm install
npm run build
```

### Testing

1. Open this folder in VS Code
2. Press `F5` to launch Extension Development Host
3. Open a Markdown file
4. Run "Renderix: Open Markdown Preview" command

### Project Structure

```
vscode-extention/
├── src/
│   ├── extension.ts      # Extension entry point
│   └── previewPanel.ts   # Webview panel management
├── dist/                 # Compiled JavaScript
├── package.json          # Extension manifest
└── README.md            # This file
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see [LICENSE](../LICENSE) file for details.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history.

## Related

- Core renderer: `@renderix/core` (shared with JetBrains plugin)
- Built with: markdown-it, highlight.js, DOMPurify

---

**Enjoy previewing your Markdown files!** 🚀
