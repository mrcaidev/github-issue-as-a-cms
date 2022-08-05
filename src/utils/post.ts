import { readdir, readFile } from "fs/promises";
import matter from "gray-matter";
import { join } from "path";
import { cwd } from "process";

const postsDirectory = join(cwd(), "posts");

export interface IPost {
  path: string;
  createdAt: string;
  title: string;
  description: string;
  topic: string;
  content: string;
}

export async function getPostByFilename(filename: string) {
  const path = filename.replace(/\.md$/, "");
  const file = join(postsDirectory, filename);
  const fileContent = await readFile(file, { encoding: "utf-8" });
  const { data, content } = matter(fileContent);

  return { ...data, path, content } as IPost;
}

export async function getAllPosts() {
  const filenames = await readdir(postsDirectory);
  return Promise.all(
    filenames
      .filter((filename) => filename.endsWith(".md"))
      .map(getPostByFilename)
  );
}
