import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import { join } from "path";
import { cwd } from "process";
import readingTime from "reading-time";
import { sortByLatest } from "./datetime";

const postsDirectory = join(cwd(), "posts");

export interface IPostOutline {
  slug: string;
  createdAt: string;
  title: string;
  description: string;
  topic: string;
  readingTime: string;
}

export interface IPost extends IPostOutline {
  content: string;
}

export function getOutline(post: IPost) {
  const { content, ...outline } = post;
  return outline as IPostOutline;
}

export function getAllSlugs() {
  const fileNames = readdirSync(postsDirectory);
  const mdFileNames = fileNames.filter((filename) => filename.endsWith(".md"));
  const slugs = mdFileNames.map((fileName) => fileName.replace(/\.md$/, ""));
  return slugs;
}

export function getPostBySlug(slug: string) {
  const filePath = join(postsDirectory, slug + ".md");
  const fileContent = readFileSync(filePath, { encoding: "utf-8" });
  const { data, content } = matter(fileContent);
  const { text } = readingTime(content);
  return { ...data, slug, readingTime: text, content } as IPost;
}

export function getAllPosts() {
  const slugs = getAllSlugs();
  const posts = slugs.map(getPostBySlug);
  posts.sort((a, b) => sortByLatest(a.createdAt, b.createdAt));
  return posts;
}

export function sortTopicByName(topics: Record<string, number>) {
  const entries = Object.entries(topics).sort(([a], [b]) => a.localeCompare(b));
  return Object.fromEntries(entries);
}

export function getAllTopics() {
  const posts = getAllPosts();
  const topics = posts.reduce((record, post) => {
    const { topic } = post;
    record[topic] = (record[topic] ?? 0) + 1;
    return record;
  }, {} as Record<string, number>);
  const sortedTopics = sortTopicByName(topics);
  return sortedTopics;
}

export function getPostsByTopic(topic: string) {
  const posts = getAllPosts();
  const postsByTopic = posts.filter((post) => post.topic === topic);
  return postsByTopic;
}
