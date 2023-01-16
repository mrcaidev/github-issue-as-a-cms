type Post = {
  slug: number;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  tag: string;
  origin: string;
  isDraft: boolean;
  content: string;
};

type PostMeta = Omit<Post, "content">;

type PostSummary = Pick<
  PostMeta,
  "slug" | "title" | "description" | "publishedAt" | "tag"
>;
