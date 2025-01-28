export const buildQueryString = (params: Record<string, string | number | null | undefined>) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (!value) return;
    query.append(key, String(value));
  });
  return query.toString() ? `?${query.toString()}` : '';
};
