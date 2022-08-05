import { readdir, readFile } from "fs/promises";
import matter from "gray-matter";
import { join } from "path";
import { cwd } from "process";
import { sortByLatest } from "./datetime";

const postsDirectory = join(cwd(), "posts");

export interface IPostOutline {
  path: string;
  createdAt: string;
  title: string;
  description: string;
  topic: string;
}

export interface IPost extends IPostOutline {
  content: string;
}

export async function getPostByFilename(filename: string) {
  const path = filename.replace(/\.md$/, "");
  const file = join(postsDirectory, filename);
  const fileContent = await readFile(file, { encoding: "utf-8" });
  const { data, content } = matter(fileContent);

  return { ...data, path, content } as IPost;
}

export function getPostOutline(post: IPost) {
  const { content, ...outline } = post;
  return outline as IPostOutline;
}

export async function getAllPosts() {
  const filenames = await readdir(postsDirectory);
  const mdFilenames = filenames.filter((filename) => filename.endsWith(".md"));
  const posts = await Promise.all(mdFilenames.map(getPostByFilename));
  posts.sort((a, b) => sortByLatest(a.createdAt, b.createdAt));
  return posts;
}
