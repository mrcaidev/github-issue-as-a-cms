import { fetchGithub } from "./fetchGithub";
import { mockTags } from "./mock";

const query = `
  query {
    repository(owner: "mrcaidev", name: "blog") {
      labels(first: 5, orderBy: { field: CREATED_AT, direction: DESC }) {
        nodes {
          name
          issues {
            totalCount
          }
        }
      }
    }
  }
`;

type ResponseJson = {
  data: {
    repository: {
      labels: {
        nodes: {
          name: string;
          issues: {
            totalCount: number;
          };
        }[];
      };
    };
  };
};

export const fetchLatestTags = async () => {
  if (process.env.NODE_ENV === "development") {
    return mockTags;
  }

  const json = await fetchGithub<ResponseJson>(query);
  return json.data.repository.labels.nodes.map((node) => ({
    name: node.name,
    count: node.issues.totalCount,
  }));
};
