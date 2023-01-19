export const mockPosts: PostSummary[] = [
  {
    slug: 6,
    title: "Web Performance: Images",
    description:
      "Images account for nearly twice as much as JavaScript in terms of web performance issues. Fortunately, there are numerous ways to optimize them.",
    publishedAt: "2023-01-15T17:00:32Z",
    tags: ["performance"],
  },
  {
    slug: 5,
    title: "How to Use Axios Interceptor in TypeScript",
    description:
      "It's a common practice to retrieve res.data in an Axios response interceptor, but TypeScript knows nothing about it. How can we inform the type system?",
    publishedAt: "2023-01-15T15:26:47Z",
    tags: ["typescript"],
  },
  {
    slug: 4,
    title: "Design Patterns in One Sentence",
    description:
      "Describe 23 mostly commonly used design patterns each in one sentence.",
    publishedAt: "2023-01-15T15:25:48Z",
    tags: ["design patterns"],
  },
  {
    slug: 3,
    title: "Design Patterns in Functional Programming",
    description:
      "Design patterns in functional programming paradigm has two distinct features - decoupling of data and methods, and first-class functions.",
    publishedAt: "2023-01-15T15:24:36Z",
    tags: ["design patterns"],
  },
  {
    slug: 2,
    title: "HTTP Caching - Fresh, Stale and Revalidation",
    description:
      "HTTP caching is critical to the performance of a website. Resources can be reused for a set period of time, and then revalidated to keep their freshness.",
    publishedAt: "2023-01-15T15:22:03Z",
    tags: ["http"],
  },
  {
    slug: 1,
    title: "Everything You Need To Know About 100 Continue",
    description:
      'The HTTP status code "100 Continue" indicates that the server feels good about the initial part of a request, and the client can go on with it.',
    publishedAt: "2023-01-15T15:02:48Z",
    tags: ["http"],
  },
];

export const mockTags: PostTag[] = mockPosts.reduce((acc, post) => {
  for (const tag of post.tags) {
    const tagIndex = acc.findIndex((t) => t.name === tag);
    if (tagIndex === -1) {
      acc.push({ name: tag, count: 1 });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      acc[tagIndex]!.count++;
    }
  }
  return acc;
}, [] as PostTag[]);
