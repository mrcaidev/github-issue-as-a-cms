import { fetchGithub } from "./fetchGithub";

const query = `
  query {
    repository(owner: "mrcaidev", name: "blog") {
      labels(first: 5, orderBy: { field: CREATED_AT, direction: DESC }) {
        nodes {
          name
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
        }[];
      };
    };
  };
};

const mockTags = [
  "http",
  "design patterns",
  "typescript",
  "performance",
  "react",
];

export const fetchLatestTags = async () => {
  if (process.env.NODE_ENV === "development") {
    return mockTags;
  }

  const json = await fetchGithub<ResponseJson>(query);
  return json.data.repository.labels.nodes.map((node) => node.name);
};
