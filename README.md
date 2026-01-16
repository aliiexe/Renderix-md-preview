# Renderix Markdown Preview

A beautiful, secure Markdown preview extension for VS Code and JetBrains IDEs with syntax highlighting and automatic theme support.

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🎯 Overview

Renderix provides a unified Markdown preview experience across multiple IDEs:
- **VS Code Extension** - Ready for deployment
- **JetBrains Plugin** - Coming soon

Both share the same core rendering engine for consistent output.

## ✨ Features

- 🎨 **Automatic Theme Support**: Seamlessly matches IDE's light/dark theme
- 💡 **Syntax Highlighting**: Code blocks highlighted with highlight.js (190+ languages)
- 🔒 **Secure by Default**: HTML sanitized with DOMPurify, strict CSP policy
- ⚡ **Fast Updates**: Preview refreshes automatically on save
- 📱 **Side-by-Side Preview**: Opens preview panel alongside editor
- 🎯 **Smart File Switching**: Automatically updates when switching files
- ⏳ **Loading States**: Smooth loading indicators
- 🛡️ **Production Ready**: Hardened security with nonce-based CSP

## 📦 Project Structure

```
Renderix-md-preview/
├── core/                    # Shared Markdown renderer (used by all IDEs)
│   ├── src/
│   │   ├── renderer.ts      # Main rendering logic
│   │   ├── themes.ts         # Light/dark theme CSS
│   │   └── index.ts          # Public API
│   └── dist/                 # Compiled output
├── vscode-extention/         # VS Code extension
│   ├── src/
│   │   ├── extension.ts     # Extension entry point
│   │   └── previewPanel.ts  # Webview panel management
│   └── dist/                 # Compiled extension
├── jetbrains-plugin/         # JetBrains plugin (coming soon)
└── shared-assets/            # Shared assets (CSS, etc.)
```

## 🚀 VS Code Extension

### Installation (Once Published)

1. Open VS Code
2. Go to Extensions (`Ctrl+Shift+X`)
3. Search for "Renderix Markdown Preview"
4. Click Install

### Usage

1. Open a Markdown file (`.md`)
2. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
3. Type "Renderix: Open Markdown Preview"
4. Preview opens side-by-side

The preview automatically updates when you save!

## 🛠️ Development

### Prerequisites

- Node.js 18.0.0 or higher
- VS Code 1.74.0+ (for extension development)
- TypeScript 5.3.3+

### Setup

```bash
# Clone the repository
git clone https://github.com/aliiexe/Renderix-md-preview.git
cd Renderix-md-preview

# Install dependencies
npm install

# Build everything
npm run build
```

### Build Individual Packages

```bash
# Build core package
cd core
npm run build

# Build VS Code extension
cd ../vscode-extention
npm run build
```

### Testing VS Code Extension

1. Open the project in VS Code
2. Press `F5` to launch Extension Development Host
3. Open a Markdown file
4. Run "Renderix: Open Markdown Preview" command

## 📝 Core API

The core renderer (`@renderix/core`) provides a stable API:

```typescript
import { renderMarkdown, type RenderOptions } from '@renderix/core';

const result = renderMarkdown('# Hello World', {
  theme: 'dark',
  highlightCode: true,
  sanitize: true
});

console.log(result.html); // Rendered HTML
console.log(result.css);  // Theme CSS
```

**⚠️ API is locked** - See [core/API_LOCK.md](core/API_LOCK.md) for details.

## 🔒 Security

- ✅ Strict Content Security Policy (CSP)
- ✅ No unsafe-inline scripts or styles
- ✅ HTML sanitization enabled by default
- ✅ Scripts disabled in webview
- ✅ Nonce-based style injection

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📚 Documentation

- [VS Code Extension README](vscode-extention/README.md)
- [Deployment Guide](vscode-extention/DEPLOYMENT.md)
- [Core API Documentation](core/API_LOCK.md)

## 🗺️ Roadmap

- [x] Core Markdown renderer
- [x] VS Code extension
- [ ] JetBrains plugin
- [ ] Live preview (on typing)
- [ ] Scroll sync
- [ ] Mermaid diagram support
- [ ] Math rendering (LaTeX)
- [ ] Export to HTML/PDF

## 🔗 Links

- **Repository**: https://github.com/aliiexe/Renderix-md-preview
- **Issues**: https://github.com/aliiexe/Renderix-md-preview/issues

---

**Built with ❤️ for the developer community**
