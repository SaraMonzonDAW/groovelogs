import { discogsFetch } from './fetchApi';

export function searchDiscogs({
  query,
  type,
  title,
  release_title,
  artist,
  label,
  genre,
  style,
  country,
  year,
  format,
  sort,
  sort_order,
  page = 1,
  per_page = 20,
}) {
  return discogsFetch('/database/search', {
    q: query,
    type,
    title,
    release_title,
    artist,
    label,
    genre,
    style,
    country,
    year,
    format,
    sort,
    sort_order,
    page,
    per_page,
  });
}
