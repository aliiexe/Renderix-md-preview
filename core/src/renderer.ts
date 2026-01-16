/**
 * @fileoverview Markdown renderer implementation
 */

import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';
import { getThemeCSS } from './themes';

/**
 * Theme options for rendering
 */
export type Theme = 'light' | 'dark';

/**
 * Options for rendering Markdown
 */
export interface RenderOptions {
  /**
   * Theme to use for rendering (light or dark)
   * @default 'light'
   */
  theme?: Theme;
  
  /**
   * Whether to enable syntax highlighting
   * @default true
   */
  highlightCode?: boolean;
  
  /**
   * Whether to sanitize HTML output
   * @default true
   */
  sanitize?: boolean;
}

/**
 * Result of rendering Markdown
 */
export interface RenderResult {
  /**
   * The rendered HTML content
   */
  html: string;
  
  /**
   * The CSS styles for the theme
   */
  css: string;
}

/**
 * Renders Markdown to HTML with optional syntax highlighting and theme support
 * 
 * @param markdown - The Markdown content to render
 * @param options - Rendering options
 * @returns The rendered HTML and CSS
 * 
 * @example
 * ```typescript
 * const result = renderMarkdown('# Hello World', { theme: 'dark' });
 * console.log(result.html); // <h1>Hello World</h1>
 * console.log(result.css);  // CSS styles for dark theme
 * ```
 */
export function renderMarkdown(
  markdown: string,
  options: RenderOptions = {}
): RenderResult {
  const {
    theme = 'light',
    highlightCode = true,
    sanitize = true,
  } = options;

  // Initialize markdown-it with GitHub-flavored Markdown
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: highlightCode ? highlightCodeBlock : undefined,
  });

  // Render Markdown to HTML
  let html = md.render(markdown);

  // Post-process to add hljs class to code blocks if highlighting is enabled
  if (highlightCode) {
    // Add hljs class to code blocks that don't already have it
    html = html.replace(/<pre><code( class="([^"]*)")?>/g, (match, classAttr, classes) => {
      if (classes && classes.includes('hljs')) {
        return match; // Already has hljs class
      }
      const existingClasses = classes ? ` ${classes}` : '';
      return `<pre><code class="hljs${existingClasses}">`;
    });
  }

  // Sanitize HTML if requested
  if (sanitize) {
    const window = new JSDOM('').window;
    const purify = DOMPurify(window as any);
    html = purify.sanitize(html);
  }

  // Get CSS for the theme
  const css = getThemeCSS(theme);

  return { html, css };
}

/**
 * Highlights a code block using highlight.js
 * This function is used as the highlight option for markdown-it
 * Note: markdown-it wraps the return value in <pre><code>, so we only return the inner HTML
 */
function highlightCodeBlock(str: string, lang: string, attrs: string): string {
  if (lang && hljs.getLanguage(lang)) {
    try {
      const highlighted = hljs.highlight(str, { language: lang }).value;
      return highlighted;
    } catch (err) {
      // Fall through to auto-detect
    }
  }
  
  // Fallback to auto-detect language
  try {
    const result = hljs.highlightAuto(str);
    return result.value;
  } catch (err) {
    // Final fallback - escape HTML and return plain text
    return str.replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#39;');
  }
}

