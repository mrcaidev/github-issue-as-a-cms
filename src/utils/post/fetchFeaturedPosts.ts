import { fetchGithub } from "./fetchGithub";

const query = `
  query {
    repository(owner: "mrcaidev", name: "blog") {
      pinnedIssues(first: 3) {
        nodes {
          issue {
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
  }
`;

type ResponseJson = {
  data: {
    repository: {
      pinnedIssues: {
        nodes: {
          issue: {
            number: number;
            title: string;
            body: string;
            closedAt: string;
            labels: {
              nodes: {
                name: string;
              }[];
            };
          };
        }[];
      };
    };
  };
};

const mockPosts = [
  {
    slug: 1,
    title: "Everything You Need To Know About 100 Continue",
    description:
      'The HTTP status code "100 Continue" indicates that the server feels good about the initial part of a request, and the client can go on with it.',
    publishedAt: "2023-01-15T15:02:48Z",
    tags: ["http"],
  },
  {
    slug: 2,
    title: "HTTP Caching - Fresh, Stale and Revalidation",
    description:
      "HTTP caching is critical to the performance of a website. Resources can be reused for a set period of time, and then revalidated to keep their freshness.",
    publishedAt: "2023-01-15T15:22:03Z",
    tags: ["http", "featured"],
  },
  {
    slug: 3,
    title: "Design Patterns in Functional Programming",
    description:
      "Design patterns in functional programming paradigm has two distinct features - decoupling of data and methods, and first-class functions.",
    publishedAt: "2023-01-15T15:24:36Z",
    tags: ["design patterns"],
  },
];

export const fetchFeaturedPosts = async () => {
  if (import.meta.env.DEV) {
    return mockPosts;
  }

  const json = await fetchGithub<ResponseJson>(query);
  const pinnedIssues = json.data.repository.pinnedIssues.nodes;

  const posts = pinnedIssues.map((pinnedIssue) => {
    const { number, title, body, closedAt, labels } = pinnedIssue.issue;
    return {
      slug: number,
      title,
      description: body,
      publishedAt: closedAt,
      tags: labels.nodes.map((label) => label.name),
    } as PostSummary;
  });

  return posts;
};
