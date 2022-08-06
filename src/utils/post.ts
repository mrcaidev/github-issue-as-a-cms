import { readdir, readFile } from "fs/promises";
import matter from "gray-matter";
import { join } from "path";
import { cwd } from "process";
import { sortByLatest } from "./datetime";

const postsDirectory = join(cwd(), "posts");

export interface IPostOutline {
  slug: string;
  createdAt: string;
  title: string;
  description: string;
  topic: string;
}

export interface IPost extends IPostOutline {
  content: string;
}

export function getOutline(post: IPost) {
  const { content, ...outline } = post;
  return outline as IPostOutline;
}

export async function getAllSlugs() {
  const fileNames = await readdir(postsDirectory);
  const mdFileNames = fileNames.filter((filename) => filename.endsWith(".md"));
  const slugs = mdFileNames.map((fileName) => fileName.replace(/\.md$/, ""));
  return slugs;
}

export async function getPostBySlug(slug: string) {
  const filePath = join(postsDirectory, slug + ".md");
  const fileContent = await readFile(filePath, { encoding: "utf-8" });
  const { data, content } = matter(fileContent);
  return { ...data, slug, content } as IPost;
}

export async function getAllPosts() {
  const slugs = await getAllSlugs();
  const posts = await Promise.all(slugs.map(getPostBySlug));
  posts.sort((a, b) => sortByLatest(a.createdAt, b.createdAt));
  return posts;
}

export function sortTopicByName(topics: Record<string, number>) {
  const entries = Object.entries(topics);
  const sortedEntries = entries.sort(
    ([a], [b]) => (a.codePointAt(0) ?? 0) - (b.codePointAt(0) ?? 0)
  );
  return Object.fromEntries(sortedEntries);
}

export async function getAllTopics() {
  const posts = await getAllPosts();
  const topics = posts.reduce((record, post) => {
    const { topic } = post;
    record[topic] = (record[topic] ?? 0) + 1;
    return record;
  }, {} as Record<string, number>);
  const sortedTopics = sortTopicByName(topics);
  return sortedTopics;
}

export async function getPostsByTopic(topic: string) {
  const posts = await getAllPosts();
  const postsByTopic = posts.filter((post) => post.topic === topic);
  return postsByTopic;
}
