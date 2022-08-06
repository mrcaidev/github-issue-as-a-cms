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

export function parseMd(content: string) {
  return marked.parse(content);
}
