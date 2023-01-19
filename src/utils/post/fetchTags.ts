import { fetchGithub } from "./fetchGithub";
import { mockTags } from "./mock";

const query = `
  query {
    repository(owner: "mrcaidev", name: "blog") {
      labels(first: 100, orderBy: { field: NAME, direction: ASC }) {
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

export const fetchTags = async () => {
  if (process.env.NODE_ENV === "development") {
    return mockTags.sort((a, b) => a.name.localeCompare(b.name));
  }

  const json = await fetchGithub<ResponseJson>(query);
  return json.data.repository.labels.nodes.map((node) => ({
    name: node.name,
    count: node.issues.totalCount,
  }));
};
