export const getIsoDate = (date: string | Date) => {
  return new Date(date).toISOString();
};

export const getFormattedDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
