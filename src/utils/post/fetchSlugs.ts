import { fetchGithub } from "./fetchGithub";
import { mockPosts } from "./mock";

const query = `
  query ($cursor: String) {
    repository(owner: "mrcaidev", name: "blog") {
      issues(
        first: 100,
        after: $cursor,
        orderBy: { field: CREATED_AT, direction: DESC }
      ) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          number
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
        }[];
      };
    };
  };
};

export const fetchSlugs = async () => {
  if (import.meta.env.DEV) {
    return mockPosts.map((post) => post.slug);
  }

  let shouldContinue = true;
  let cursor = "";
  const slugs = [];
  while (shouldContinue) {
    const json = await fetchGithub<ResponseJson>(
      query,
      cursor ? { cursor } : {}
    );

    const { hasNextPage, endCursor } = json.data.repository.issues.pageInfo;
    shouldContinue = hasNextPage;
    cursor = endCursor;

    const newSlugs = json.data.repository.issues.nodes.map(
      (node) => node.number
    );
    slugs.push(...newSlugs);
  }

  return slugs;
};
