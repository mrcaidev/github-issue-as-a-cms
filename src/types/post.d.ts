type Post = {
  slug: number;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  origin: string;
  isDraft: boolean;
  content: string;
};

type PostMeta = Omit<Post, "content">;

type PostSummary = Pick<
  Post,
  "slug" | "title" | "description" | "publishedAt" | "tags"
>;
