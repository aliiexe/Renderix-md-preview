/**
 * @fileoverview Theme CSS definitions
 */

import type { Theme } from './renderer';

/**
 * Returns CSS for the specified theme
 */
export function getThemeCSS(theme: Theme): string {
  return theme === 'dark' ? darkThemeCSS : lightThemeCSS;
}

/**
 * Light theme CSS
 */
const lightThemeCSS = `
/* Renderix Markdown Preview - Light Theme */

.renderix-preview {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #24292e;
  background-color: #ffffff;
  padding: 20px;
  max-width: 980px;
  margin: 0 auto;
}

.renderix-preview h1,
.renderix-preview h2,
.renderix-preview h3,
.renderix-preview h4,
.renderix-preview h5,
.renderix-preview h6 {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
  color: #24292e;
}

.renderix-preview h1 {
  font-size: 2em;
  border-bottom: 1px solid #eaecef;
  padding-bottom: 0.3em;
}

.renderix-preview h2 {
  font-size: 1.5em;
  border-bottom: 1px solid #eaecef;
  padding-bottom: 0.3em;
}

.renderix-preview h3 {
  font-size: 1.25em;
}

.renderix-preview h4 {
  font-size: 1em;
}

.renderix-preview h5 {
  font-size: 0.875em;
}

.renderix-preview h6 {
  font-size: 0.85em;
  color: #6a737d;
}

.renderix-preview p {
  margin-top: 0;
  margin-bottom: 16px;
}

.renderix-preview ul,
.renderix-preview ol {
  margin-top: 0;
  margin-bottom: 16px;
  padding-left: 2em;
}

.renderix-preview li {
  margin-top: 0.25em;
}

.renderix-preview blockquote {
  padding: 0 1em;
  color: #6a737d;
  border-left: 0.25em solid #dfe2e5;
  margin: 0 0 16px 0;
}

.renderix-preview code {
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  background-color: rgba(27, 31, 35, 0.05);
  border-radius: 3px;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
}

.renderix-preview pre {
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  background-color: #f6f8fa;
  border-radius: 6px;
  margin-bottom: 16px;
}

.renderix-preview pre code {
  display: inline;
  max-width: auto;
  padding: 0;
  margin: 0;
  overflow: visible;
  line-height: inherit;
  word-wrap: normal;
  background-color: transparent;
  border: 0;
}

.renderix-preview pre > code {
  display: block;
  padding: 0;
  margin: 0;
  word-break: normal;
  white-space: pre;
  background: transparent;
  border: 0;
}

.renderix-preview table {
  border-spacing: 0;
  border-collapse: collapse;
  margin-top: 0;
  margin-bottom: 16px;
  width: 100%;
}

.renderix-preview table th,
.renderix-preview table td {
  padding: 6px 13px;
  border: 1px solid #dfe2e5;
}

.renderix-preview table th {
  font-weight: 600;
  background-color: #f6f8fa;
}

.renderix-preview table tr:nth-child(2n) {
  background-color: #f6f8fa;
}

.renderix-preview a {
  color: #0366d6;
  text-decoration: none;
}

.renderix-preview a:hover {
  text-decoration: underline;
}

.renderix-preview img {
  max-width: 100%;
  box-sizing: content-box;
  background-color: #ffffff;
  border-style: none;
  margin: 0;
}

.renderix-preview hr {
  height: 0.25em;
  padding: 0;
  margin: 24px 0;
  background-color: #e1e4e8;
  border: 0;
}

/* Syntax highlighting - Light theme */
.renderix-preview .hljs {
  background: #f6f8fa;
  color: #24292e;
}

.renderix-preview .hljs-comment,
.renderix-preview .hljs-quote {
  color: #6a737d;
  font-style: italic;
}

.renderix-preview .hljs-keyword,
.renderix-preview .hljs-selector-tag,
.renderix-preview .hljs-type {
  color: #d73a49;
}

.renderix-preview .hljs-string,
.renderix-preview .hljs-literal,
.renderix-preview .hljs-number {
  color: #032f62;
}

.renderix-preview .hljs-function,
.renderix-preview .hljs-title {
  color: #6f42c1;
}

.renderix-preview .hljs-variable,
.renderix-preview .hljs-template-variable {
  color: #e36209;
}

.renderix-preview .hljs-attr,
.renderix-preview .hljs-attribute {
  color: #005cc5;
}
`;

/**
 * Dark theme CSS
 */
const darkThemeCSS = `
/* Renderix Markdown Preview - Dark Theme */

.renderix-preview {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #c9d1d9;
  background-color: #0d1117;
  padding: 20px;
  max-width: 980px;
  margin: 0 auto;
}

.renderix-preview h1,
.renderix-preview h2,
.renderix-preview h3,
.renderix-preview h4,
.renderix-preview h5,
.renderix-preview h6 {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
  color: #c9d1d9;
}

.renderix-preview h1 {
  font-size: 2em;
  border-bottom: 1px solid #30363d;
  padding-bottom: 0.3em;
}

.renderix-preview h2 {
  font-size: 1.5em;
  border-bottom: 1px solid #30363d;
  padding-bottom: 0.3em;
}

.renderix-preview h3 {
  font-size: 1.25em;
}

.renderix-preview h4 {
  font-size: 1em;
}

.renderix-preview h5 {
  font-size: 0.875em;
}

.renderix-preview h6 {
  font-size: 0.85em;
  color: #8b949e;
}

.renderix-preview p {
  margin-top: 0;
  margin-bottom: 16px;
}

.renderix-preview ul,
.renderix-preview ol {
  margin-top: 0;
  margin-bottom: 16px;
  padding-left: 2em;
}

.renderix-preview li {
  margin-top: 0.25em;
}

.renderix-preview blockquote {
  padding: 0 1em;
  color: #8b949e;
  border-left: 0.25em solid #30363d;
  margin: 0 0 16px 0;
}

.renderix-preview code {
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  background-color: rgba(110, 118, 129, 0.4);
  border-radius: 3px;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  color: #c9d1d9;
}

.renderix-preview pre {
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  background-color: #161b22;
  border-radius: 6px;
  margin-bottom: 16px;
}

.renderix-preview pre code {
  display: inline;
  max-width: auto;
  padding: 0;
  margin: 0;
  overflow: visible;
  line-height: inherit;
  word-wrap: normal;
  background-color: transparent;
  border: 0;
  color: #c9d1d9;
}

.renderix-preview pre > code {
  display: block;
  padding: 0;
  margin: 0;
  word-break: normal;
  white-space: pre;
  background: transparent;
  border: 0;
}

.renderix-preview table {
  border-spacing: 0;
  border-collapse: collapse;
  margin-top: 0;
  margin-bottom: 16px;
  width: 100%;
}

.renderix-preview table th,
.renderix-preview table td {
  padding: 6px 13px;
  border: 1px solid #30363d;
}

.renderix-preview table th {
  font-weight: 600;
  background-color: #161b22;
}

.renderix-preview table tr:nth-child(2n) {
  background-color: #161b22;
}

.renderix-preview a {
  color: #58a6ff;
  text-decoration: none;
}

.renderix-preview a:hover {
  text-decoration: underline;
}

.renderix-preview img {
  max-width: 100%;
  box-sizing: content-box;
  background-color: #0d1117;
  border-style: none;
  margin: 0;
}

.renderix-preview hr {
  height: 0.25em;
  padding: 0;
  margin: 24px 0;
  background-color: #30363d;
  border: 0;
}

/* Syntax highlighting - Dark theme */
.renderix-preview .hljs {
  background: #161b22;
  color: #c9d1d9;
}

.renderix-preview .hljs-comment,
.renderix-preview .hljs-quote {
  color: #8b949e;
  font-style: italic;
}

.renderix-preview .hljs-keyword,
.renderix-preview .hljs-selector-tag,
.renderix-preview .hljs-type {
  color: #ff7b72;
}

.renderix-preview .hljs-string,
.renderix-preview .hljs-literal,
.renderix-preview .hljs-number {
  color: #a5d6ff;
}

.renderix-preview .hljs-function,
.renderix-preview .hljs-title {
  color: #d2a8ff;
}

.renderix-preview .hljs-variable,
.renderix-preview .hljs-template-variable {
  color: #ffa657;
}

.renderix-preview .hljs-attr,
.renderix-preview .hljs-attribute {
  color: #79c0ff;
}
`;
