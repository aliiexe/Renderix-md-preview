# Change Log

All notable changes to the "Renderix Markdown Preview" extension will be documented in this file.

## [0.1.0] - 2024-01-16

### Added
- Initial release of Renderix Markdown Preview
- Markdown to HTML rendering with GitHub-flavored Markdown support
- Syntax highlighting for code blocks using highlight.js
- Light and dark theme support (automatically matches VS Code theme)
- HTML sanitization using DOMPurify for security
- Automatic preview refresh on file save
- Side-by-side preview panel
- Loading state indicator
- Placeholder UI when no Markdown file is active
- Graceful file switching between Markdown files
- Strict Content Security Policy (CSP) with nonce-based styles
- Panel reuse for better UX

### Security
- Strict CSP policy with no unsafe-inline
- Scripts disabled in webview
- HTML output sanitized by default
