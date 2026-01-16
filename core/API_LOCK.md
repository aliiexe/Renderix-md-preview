# Core API Lock Notice

⚠️ **IMPORTANT: This API is now FROZEN**

The `@renderix/core` package API is locked and should not be changed to ensure compatibility across VS Code and JetBrains plugins.

## Locked APIs

### `renderMarkdown()`
- **Signature**: `renderMarkdown(markdown: string, options?: RenderOptions): RenderResult`
- **DO NOT CHANGE**: Parameters, return type, or function name

### `RenderOptions`
- **DO NOT CHANGE**: Interface shape, property names, or types
- Current properties:
  - `theme?: Theme` (default: 'light')
  - `highlightCode?: boolean` (default: true)
  - `sanitize?: boolean` (default: true)

### `RenderResult`
- **DO NOT CHANGE**: Interface shape
- Current properties:
  - `html: string`
  - `css: string`

### `Theme`
- **DO NOT CHANGE**: Type definition
- Current values: `'light' | 'dark'`

## Why This Matters

- VS Code extension depends on this API
- JetBrains plugin will reuse the same API
- Breaking changes would require updates in multiple places
- Stability ensures consistent behavior across IDEs

## Making Changes

If you absolutely must change the API:
1. Create a new version (e.g., `renderMarkdownV2`)
2. Keep the old API for backward compatibility
3. Update all consumers (VS Code + JetBrains)
4. Document the migration path

## Current Version

- **Version**: 0.1.0
- **Locked Date**: 2024-01-16
- **Status**: ✅ Stable
