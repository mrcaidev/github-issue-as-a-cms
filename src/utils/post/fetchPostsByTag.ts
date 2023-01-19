import { fetchGithub } from "./fetchGithub";
import { mockPosts } from "./mock";

const query = `
  query ($label: String!) {
    repository(owner: "mrcaidev", name: "blog") {
      issues(
        first: 100,
        filterBy: { createdBy: "mrcaidev", states: CLOSED, labels: [$label] },
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

export const fetchPostsByTag = async (tag: string) => {
  if (import.meta.env.DEV) {
    return mockPosts.filter((post) => post.tags.includes(tag));
  }

  const json = await fetchGithub<ResponseJson>(query, { label: tag });
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
