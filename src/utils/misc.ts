export const toKebabCase = (raw: string) => {
  return raw.toLowerCase().replace(/\s+/g, "-");
};
