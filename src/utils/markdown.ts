import { marked } from "marked";
import prism from "prismjs";
import "prismjs/components/prism-json";
import "prismjs/components/prism-typescript";

marked.setOptions({
  highlight: (code, lang) => {
    const grammer = prism.languages[lang];
    return grammer ? prism.highlight(code, grammer, lang) : code;
  },
});

export interface Heading {
  anchor: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
}

export function parseMd(content: string) {
  const toc: Heading[] = [];

  const renderer = new marked.Renderer();
  renderer.heading = (text, level) => {
    const anchor = text.toLowerCase().replace(/\s+/g, "-");
    toc.push({ anchor, level, text });
    return `<h${level} id="${anchor}">${text}</h${level}>`;
  };

  const html = marked.parse(content, { renderer });

  return { toc, html };
}
