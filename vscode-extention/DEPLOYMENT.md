# Deployment Guide for VS Code Extension

## Prerequisites

1. **VS Code Marketplace Account**
   - Go to https://marketplace.visualstudio.com/manage
   - Sign in with your Microsoft/GitHub account
   - Create a publisher (if you don't have one)
   - Note your publisher name

2. **Personal Access Token (PAT)**
   - Go to https://dev.azure.com
   - User Settings → Personal Access Tokens
   - Create a token with "Marketplace (Manage)" scope
   - Save the token securely

## Step 1: Update package.json

1. Replace `YOUR_PUBLISHER_NAME` in `package.json` with your actual publisher name
2. Replace `YOUR_USERNAME` in repository URLs with your GitHub username
3. Update repository URL if your repo is hosted elsewhere

## Step 2: Install vsce (VS Code Extension Manager)

```bash
npm install -g @vscode/vsce
```

Or use it locally (already added to devDependencies):
```bash
cd vscode-extention
npm install
```

## Step 3: Build the Extension

```bash
# From root directory
npm run build

# Or from vscode-extention directory
cd vscode-extention
npm run build
```

## Step 4: Package the Extension

```bash
cd vscode-extention
npx vsce package
```

This creates a `.vsix` file (e.g., `renderix-md-preview-0.1.0.vsix`)

## Step 5: Test the Package Locally

1. In VS Code, go to Extensions view
2. Click the `...` menu → "Install from VSIX..."
3. Select your `.vsix` file
4. Test the extension thoroughly

## Step 6: Publish to Marketplace

### Option A: Using vsce (Recommended)

```bash
cd vscode-extention
npx vsce publish
```

You'll be prompted for:
- Personal Access Token (PAT)
- Publisher name (if not in package.json)

### Option B: Manual Upload

1. Go to https://marketplace.visualstudio.com/manage
2. Click "New extension"
3. Upload your `.vsix` file
4. Fill in the details
5. Submit for review

## Step 7: Update Extension

For future updates:

1. Update version in `package.json` (semantic versioning)
2. Update `CHANGELOG.md` with changes
3. Build and package:
   ```bash
   npm run build
   cd vscode-extention
   npx vsce package
   ```
4. Publish:
   ```bash
   npx vsce publish
   ```

## Important Notes

- **Version**: Use semantic versioning (MAJOR.MINOR.PATCH)
- **Publisher Name**: Must match your marketplace publisher exactly
- **License**: Required - MIT license included
- **README.md**: Will be displayed on marketplace
- **CHANGELOG.md**: Will be displayed on marketplace
- **Icon**: Optional but recommended (128x128 PNG in root)

## Troubleshooting

### "Publisher not found"
- Verify publisher name in package.json matches marketplace
- Create publisher at https://marketplace.visualstudio.com/manage

### "Invalid Personal Access Token"
- Generate a new PAT with "Marketplace (Manage)" scope
- Token expires - may need to regenerate

### "Extension validation failed"
- Check all required fields in package.json
- Ensure LICENSE file exists
- Verify main entry point exists (dist/extension.js)

### "Dependencies not bundled"
- vsce should bundle dependencies automatically
- Check .vscodeignore to ensure node_modules is excluded
- For local file dependencies (like @renderix/core), they need to be bundled

## Bundling Local Dependencies

Since we use `@renderix/core` as a local dependency, we need to ensure it's bundled:

1. The core package should be built first
2. vsce will automatically bundle it if it's in dependencies
3. If issues occur, you may need to use webpack or esbuild to bundle

## Checklist Before Publishing

- [ ] Publisher name set in package.json
- [ ] Repository URL updated
- [ ] Version number set correctly
- [ ] LICENSE file exists
- [ ] CHANGELOG.md updated
- [ ] README.md is comprehensive
- [ ] Extension builds successfully
- [ ] Extension tested locally
- [ ] .vsix file created successfully
- [ ] Personal Access Token ready
