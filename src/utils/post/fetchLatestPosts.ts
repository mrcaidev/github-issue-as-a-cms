import { fetchGithub } from "./fetchGithub";

const query = `
  query {
    repository(owner: "mrcaidev", name: "blog") {
      issues(
        first: 5,
        filterBy: { createdBy: "mrcaidev", states: CLOSED },
        orderBy: { field: CREATED_AT, direction: DESC }
      ) {
        nodes {
          number
          title
          body
          closedAt
          labels(first: 3) {
            nodes {
              name
            }
          }
        }
      }
    }
  }
`;

type ResponseJson = {
  data: {
    repository: {
      issues: {
        nodes: {
          number: number;
          title: string;
          body: string;
          closedAt: string;
          labels: {
            nodes: {
              name: string;
            }[];
          };
        }[];
      };
    };
  };
};

const mockPosts: PostSummary[] = [
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
    tags: ["performance"],
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
];

export const fetchLatestPosts = async () => {
  if (import.meta.env.DEV) {
    return mockPosts;
  }

  const json = await fetchGithub<ResponseJson>(query);
  return json.data.repository.issues.nodes.map((node) => {
    const { number, title, body, closedAt, labels } = node;
    return {
      slug: number,
      title,
      description: body,
      publishedAt: closedAt,
      tags: labels.nodes.map((label) => label.name),
    } as PostSummary;
  });
};
