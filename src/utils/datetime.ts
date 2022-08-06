function getDaysBetween(before: Date, after: Date) {
  return ~~((after.getTime() - before.getTime()) / (1000 * 60 * 60 * 24));
}

export function formatTime(createdAt: string) {
  const now = new Date();
  const date = new Date(createdAt);
  const daysBetween = getDaysBetween(date, now);
  if (daysBetween === 0) {
    return "Today";
  } else if (daysBetween === 1) {
    return "Yesterday";
  } else if (daysBetween < 5) {
    return daysBetween + " days ago";
  } else {
    return date.toLocaleDateString("en", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
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
