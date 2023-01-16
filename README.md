[![Banner](public/banner.png)](https://blog.mrcai.dev)

## ✨ Introduction

This repository contains source code and posts of [my blog](https://blog.mrcai.dev).

Some features include:

- GitHub Issues as CMS
- SEO best practices
- Dark mode
- Codeblock syntax highlighting
- Smaller CSS & JS bundle size

## 🗃️ GitHub Issues as CMS

It used to be a common practice to include the metadata of a blog post in its frontmatter, such as:

- title
- description
- created time
- updated time
- tags
- ...

However, as the number of posts increases, it becomes tedious and tiresome to remember all of the required properties. And sometimes you may have the nagging feeling that some properties, such as updated time, should have been managed automatically.

There are numerous brilliant CMS on the market to address this issue. (WordPress, Strapi, Payload, ...) However, they either require a server or charge a fee. Besides, rather than having a separate content authoring system, I prefer to keep source code and blog posts colocated.

In this regard, GitHub Issues is unquestionably an excellent solution, as almost every field in the frontmatter can be automatically managed.

|  GitHub Issue  |  Blog Post   |
| :------------: | :----------: |
|     number     |      id      |
|     title      |    title     |
|      body      | description  |
| first comment  |   content    |
| other comments |   comments   |
|      open      |    draft     |
|     closed     |  published   |
|   created at   |  created at  |
|   closed at    | published at |
|   updated at   |  updated at  |
|      pin       |   featured   |
|      url       |    origin    |
|     labels     |     tags     |

## 🧰 Built with

[![Astro](https://img.shields.io/badge/astro-7e22ce?style=for-the-badge&logo=astro&logoColor=ffffff)](https://astro.build/)
[![Solid](https://img.shields.io/badge/solid-446b9e?style=for-the-badge&logo=solid&logoColor=ffffff)](https://www.solidjs.com/)
[![TypeScript](https://img.shields.io/badge/typescript-3178c6?style=for-the-badge&logo=typescript&logoColor=ffffff)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://shields.io/badge/tailwind%20css-ffffff?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![pnpm](https://img.shields.io/badge/pnpm-f69220?style=for-the-badge&logo=pnpm&logoColor=ffffff)](https://pnpm.io/)
[![Vite](https://img.shields.io/badge/vite-646cff?style=for-the-badge&logo=vite&logoColor=ffffff)](https://vitejs.dev/)
[![EditorConfig](https://shields.io/badge/editorconfig-000?style=for-the-badge&logo=editorconfig&logoColor=ffffff)](https://editorconfig.org/)
[![ESLint](https://shields.io/badge/eslint-4b32c3?style=for-the-badge&logo=eslint&logoColor=ffffff)](https://eslint.org/)
[![Prettier](https://shields.io/badge/prettier-24292e?style=for-the-badge&logo=prettier)](https://prettier.io/)
