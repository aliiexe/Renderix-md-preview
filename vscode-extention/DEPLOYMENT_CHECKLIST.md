# Deployment Checklist

## ✅ Required Items (Must Complete)

### 1. Update package.json
- [ ] Replace `YOUR_PUBLISHER_NAME` with your actual VS Code Marketplace publisher name
- [ ] Replace `YOUR_USERNAME` in repository URLs with your GitHub/GitLab username
- [ ] Update repository URL if your repo is hosted elsewhere

### 2. Create VS Code Marketplace Account
- [ ] Go to https://marketplace.visualstudio.com/manage
- [ ] Sign in with Microsoft/GitHub account
- [ ] Create a publisher (if you don't have one)
- [ ] Note your publisher name (needed for package.json)

### 3. Generate Personal Access Token (PAT)
- [ ] Go to https://dev.azure.com
- [ ] User Settings → Personal Access Tokens
- [ ] Create new token with "Marketplace (Manage)" scope
- [ ] Save token securely (you'll need it for publishing)

### 4. Install vsce Tool
```bash
npm install -g @vscode/vsce
```
Or use locally (already in devDependencies):
```bash
cd vscode-extention
npm install
```

### 5. Build Everything
```bash
# Build core package first
cd core
npm run build

# Build extension
cd ../vscode-extention
npm run build
```

### 6. Test Locally
- [ ] Press F5 in VS Code to test extension
- [ ] Verify preview works correctly
- [ ] Test with different Markdown files
- [ ] Test theme switching
- [ ] Test file switching

### 7. Package Extension
```bash
cd vscode-extention
npx vsce package
```
- [ ] Verify `.vsix` file is created
- [ ] Install `.vsix` locally to test: Extensions → ... → Install from VSIX

## 📦 Optional but Recommended

- [ ] Add extension icon (128x128 PNG) - set `icon` field in package.json
- [ ] Add screenshots to README.md
- [ ] Add demo GIF/video
- [ ] Set up CI/CD for automatic publishing
- [ ] Add badges to README (version, downloads, etc.)

## 🚀 Ready to Publish

Once all checkboxes are complete:

```bash
cd vscode-extention
npx vsce publish
```

You'll be prompted for:
1. Personal Access Token (PAT)
2. Publisher name (if not in package.json)

## 📝 After Publishing

- [ ] Verify extension appears on marketplace
- [ ] Test installation from marketplace
- [ ] Share with users/community
- [ ] Monitor for issues/feedback

## 🔄 For Future Updates

1. Update version in package.json (semantic versioning)
2. Update CHANGELOG.md
3. Build and package
4. Publish

---

**Current Status**: Ready for deployment after completing checklist items 1-3.
