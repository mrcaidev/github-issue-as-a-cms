export function formatTime(createdAt: string) {
  return new Date(createdAt).toLocaleDateString("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function sortByLatest(dateA: string, dateB: string) {
  const a = new Date(dateA);
  const b = new Date(dateB);
  return b.getTime() - a.getTime();
}

export function sortByEarliest(dateA: string, dateB: string) {
  const a = new Date(dateA);
  const b = new Date(dateB);
  return a.getTime() - b.getTime();
}
