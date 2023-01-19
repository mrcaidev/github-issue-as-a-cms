import { fetchGithub } from "./fetchGithub";
import { mockPost } from "./mock";

const query = `
  query ($slug: Int!) {
    repository(owner: "mrcaidev", name: "blog") {
      issue(number: $slug) {
        title
        body
        state
        url
        closedAt
        comments(first: 1) {
          nodes {
            body
            updatedAt
          }
        }
        labels(first: 3) {
          nodes {
            name
          }
        }
      }
    }
  }
`;

type ResponseJson = {
  data: {
    repository: {
      issue: {
        title: string;
        body: string;
        state: string;
        url: string;
        closedAt: string;
        comments: {
          nodes: {
            body: string;
            updatedAt: string;
          }[];
        };
        labels: {
          nodes: {
            name: string;
          }[];
        };
      };
    };
  };
};

export const fetchPostBySlug = async (slug: number) => {
  if (import.meta.env.DEV) {
    return mockPost;
  }

  const json = await fetchGithub<ResponseJson>(query, { slug });
  const { title, body, state, url, closedAt, comments, labels } =
    json.data.repository.issue;
  return {
    slug,
    title,
    description: body,
    isDraft: state === "OPEN",
    origin: url,
    publishedAt: closedAt,
    updatedAt: comments.nodes[0]?.updatedAt ?? "",
    tags: labels.nodes.map((node) => node.name),
    content: comments.nodes[0]?.body ?? "Not found.",
  } as Post;
};
