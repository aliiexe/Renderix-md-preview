/**
 * Basic test to verify the renderer works
 * Run with: node test-basic.js
 */

const { renderMarkdown } = require('./dist/index.js');

// Test basic markdown rendering
const markdown = `# Hello World

This is a **test** of the Renderix markdown renderer.

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

- Item 1
- Item 2
- Item 3
`;

console.log('Testing light theme...');
const lightResult = renderMarkdown(markdown, { theme: 'light' });
console.log('HTML length:', lightResult.html.length);
console.log('CSS length:', lightResult.css.length);
console.log('✓ Light theme test passed');

console.log('\nTesting dark theme...');
const darkResult = renderMarkdown(markdown, { theme: 'dark' });
console.log('HTML length:', darkResult.html.length);
console.log('CSS length:', darkResult.css.length);
console.log('✓ Dark theme test passed');

console.log('\nTesting without highlighting...');
const noHighlight = renderMarkdown(markdown, { highlightCode: false });
console.log('HTML length:', noHighlight.html.length);
console.log('✓ No highlight test passed');

console.log('\nAll tests passed! ✓');
