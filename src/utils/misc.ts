import { ParsedUrlQuery } from "querystring";

export function getPageFromQuery(query: ParsedUrlQuery) {
  return typeof query.page !== "string" || isNaN(+query.page) ? 1 : +query.page;
}
