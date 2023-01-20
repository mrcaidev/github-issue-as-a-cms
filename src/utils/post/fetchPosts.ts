import { fetchGithub } from "./fetchGithub";
import { mockPosts } from "./mock";

const query = `
  query ($cursor: String) {
    repository(owner: "mrcaidev", name: "blog") {
      issues(
        first: 100,
        after: $cursor,
        filterBy: { createdBy: "mrcaidev", states: CLOSED },
        orderBy: { field: CREATED_AT, direction: DESC }
      ) {
        pageInfo {
          hasNextPage
          endCursor
        }
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
        pageInfo: {
          hasNextPage: boolean;
          endCursor: string;
        };
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

export const fetchPosts = async () => {
  if (import.meta.env.DEV) {
    return mockPosts;
  }

  let shouldContinue = true;
  let cursor = "";
  const posts = [];
  while (shouldContinue) {
    const json = await fetchGithub<ResponseJson>(
      query,
      cursor ? { cursor } : {}
    );

    const { hasNextPage, endCursor } = json.data.repository.issues.pageInfo;
    shouldContinue = hasNextPage;
    cursor = endCursor;

    const newPosts = json.data.repository.issues.nodes.map((node) => {
      const { number, title, body, closedAt, labels } = node;
      return {
        slug: number,
        title,
        description: body,
        publishedAt: closedAt,
        tags: labels.nodes.map((label) => label.name),
      };
    });
    posts.push(...newPosts);
  }

  return posts;
};
