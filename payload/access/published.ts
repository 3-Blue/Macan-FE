import type { Access } from "payload";

/**
 * Public read access for draft-enabled collections.
 *
 * Authenticated users (admins) see everything, including drafts. Anonymous /
 * public requests — REST (`/api/...`) and GraphQL (`/api/graphql`) — are
 * constrained to published documents via a query filter, so unpublished drafts
 * never leak through the public API even though `versions.drafts` is enabled.
 */
export const publishedOrAuthenticated: Access = ({ req: { user } }) => {
  if (user) return true;
  return { _status: { equals: "published" } };
};
