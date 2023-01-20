const API_URL = "https://api.github.com/graphql";

export const fetchGithub = async <T>(query: string, variables: object = {}) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `token ${import.meta.env.GITHUB_TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch Github API", { cause: response });
  }

  const json = await response.json();

  if (json.errors) {
    throw new Error("Github API returns error", { cause: json.errors });
  }

  return json as T;
};
