export function getUrlWithParams(
  pathname: string,
  {
    category,
    isIrregular,
    search,
    page,
  }: {
    category?: string;
    isIrregular?: boolean | null;
    search?: string;
    page?: number;
  }
) {
  const params = new URLSearchParams();
  if (category) params.set('category', category);
  if (isIrregular !== null && isIrregular !== undefined)
    params.set('isIrregular', String(isIrregular));
  if (search) params.set('search', search);
  if (page) params.set('page', String(page));
  return `${pathname}?${params.toString()}`;
}
