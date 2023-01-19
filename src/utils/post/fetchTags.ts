import { fetchGithub } from "./fetchGithub";

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

const mockTags: PostTag[] = [
  { name: "http", count: 2 },
  { name: "design patterns", count: 2 },
  { name: "typescript", count: 1 },
  { name: "performance", count: 1 },
  { name: "react", count: 0 },
];

export const fetchTags = async () => {
  if (process.env.NODE_ENV === "development") {
    return mockTags;
  }

  const json = await fetchGithub<ResponseJson>(query);
  return json.data.repository.labels.nodes.map((node) => ({
    name: node.name,
    count: node.issues.totalCount,
  }));
};
