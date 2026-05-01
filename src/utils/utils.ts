export const normalizeArray = (array: string[] | string): string[] =>
  Array.isArray(array)
    ? array
    : array
        .split(',')
        .map((id) => id.trim())
        .filter(Boolean);
