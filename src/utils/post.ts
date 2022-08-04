import { readdir, readFile, stat } from "fs/promises";
import matter from "gray-matter";
import { join } from "path";
import { cwd } from "process";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, DEFAULT_TOPIC } from "./constants";

const postsDirectory = join(cwd(), "posts");

export interface Post {
  path: string;
  createdAt: string;
  title: string;
  description: string;
  topic: string;
  content: string;
}

export async function getPostByFilename(filename: string) {
  const file = join(postsDirectory, filename);
  const fileContent = await readFile(file, { encoding: "utf-8" });
  const { data, content } = matter(fileContent);

  const path = filename.replace(/\.md$/, "");
  const { birthtime } = await stat(file);
  const createdAt = birthtime.toLocaleDateString("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return {
    path,
    createdAt,
    title: data.title ?? DEFAULT_TITLE,
    description: data.description ?? DEFAULT_DESCRIPTION,
    topic: data.topic ?? DEFAULT_TOPIC,
    content,
  } as Post;
}

export async function getAllPosts() {
  const filenames = await readdir(postsDirectory);
  return Promise.all(
    filenames
      .filter((filename) => filename.endsWith(".md"))
      .map(getPostByFilename)
  );
}
