import { searchDiscogs } from './searchDiscogs';

export function getBestSelling({
  format,
  limit,
  sort,
  sort_order,
}) {
  return searchDiscogs({
    type: 'release',
    format,
    sort,
    sort_order,
    per_page: limit,
  });
}
