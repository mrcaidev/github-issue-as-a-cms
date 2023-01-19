import { fetchGithub } from "./fetchGithub";
import { mockPosts } from "./mock";

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

export const fetchLatestPosts = async () => {
  if (import.meta.env.DEV) {
    return mockPosts.slice(0, 5);
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
