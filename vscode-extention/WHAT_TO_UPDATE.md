# What You Need to Update Before Deploying

## ⚠️ Required Updates

### 1. Repository URLs in package.json
Update these fields in `vscode-extention/package.json`:

```json
"repository": {
  "type": "git",
  "url": "https://github.com/YOUR_USERNAME/Renderix-md-preview.git"  // ← Change YOUR_USERNAME
},
"homepage": "https://github.com/YOUR_USERNAME/Renderix-md-preview",  // ← Change YOUR_USERNAME
"bugs": {
  "url": "https://github.com/YOUR_USERNAME/Renderix-md-preview/issues"  // ← Change YOUR_USERNAME
}
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### 2. Verify Publisher Name
Your publisher is set to: `"Ali Bourak"`

Make sure this matches your VS Code Marketplace publisher name exactly.
- Check at: https://marketplace.visualstudio.com/manage
- If different, update the `publisher` field in package.json

## ✅ Already Complete

- ✅ LICENSE file created (MIT)
- ✅ CHANGELOG.md created
- ✅ README.md updated for marketplace
- ✅ vsce added to devDependencies
- ✅ .vscodeignore configured
- ✅ All required package.json fields added
- ✅ Keywords and categories set

## 📋 Quick Deployment Steps

1. **Update repository URLs** (see above)

2. **Create/Verify Marketplace Publisher**:
   - Go to https://marketplace.visualstudio.com/manage
   - Create publisher if needed (name: "Ali Bourak")
   - Get Personal Access Token (PAT)

3. **Install vsce** (if not already):
   ```bash
   cd vscode-extention
   npm install
   ```

4. **Build**:
   ```bash
   # Build core first
   cd core
   npm run build
   
   # Build extension
   cd ../vscode-extention
   npm run build
   ```

5. **Package**:
   ```bash
   cd vscode-extention
   npx vsce package
   ```

6. **Test locally**:
   - Install the .vsix file in VS Code
   - Test thoroughly

7. **Publish**:
   ```bash
   npx vsce publish
   ```
   - Enter your Personal Access Token when prompted

## 🎯 That's It!

Once you update the repository URLs, you're ready to deploy!
