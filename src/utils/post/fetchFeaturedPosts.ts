import { fetchGithub } from "./fetchGithub";
import { mockPosts } from "./mock";

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

export const fetchFeaturedPosts = async () => {
  if (import.meta.env.DEV) {
    return mockPosts.slice(0, 3);
  }

  const json = await fetchGithub<ResponseJson>(query);
  return json.data.repository.pinnedIssues.nodes.map((node) => {
    const { number, title, body, closedAt, labels } = node.issue;
    return {
      slug: number,
      title,
      description: body,
      publishedAt: closedAt,
      tags: labels.nodes.map((label) => label.name),
    } as PostSummary;
  });
};
