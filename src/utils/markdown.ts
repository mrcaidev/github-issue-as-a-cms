import { marked, Renderer } from "marked";
import { getHighlighter } from "shiki";

const highlighter = await getHighlighter({
  theme: "one-dark-pro",
});

const renderer = new Renderer();
renderer.heading = (text, level) => {
  const slug = text.toLowerCase().replace(/[\W]+/g, "-");
  return `
    <h${level} id=${slug}>
      <a href="#${slug}">
        ${text}
      </a>
    </h${level}>
  `;
};
renderer.code = (code, lang = "txt") => {
  return highlighter.codeToHtml(code, { lang });
};

export const parseMarkdown = (markdown: string) => {
  return marked.parse(markdown, { renderer });
};
