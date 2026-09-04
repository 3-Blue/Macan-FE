// lib/types/client-partner.ts

/**
 * Client/partner content model (#34).
 * CMS-agnostic type, mirroring lib/types/industry.ts. Once the CMS
 * adapter lands, this shape should map to a Payload/Sanity collection.
 */

export interface ClientPartner {
  /** Unique identifier, e.g. from CMS */
  id: string;

  /** Company/partner display name — a proper noun, not localized */
  name: string;

  /** Logo asset for display */
  logo: {
    url: string;
    alt: string;
  };

  /** External link to the client/partner's site */
  link: string;

  /** Display label, e.g. "Technology Partner", "Client", "Supplier" */
  category: string;

  /** Controls display order in the logo grid/strip */
  order: number;

  /** Whether this entry should be visible on the site */
  published: boolean;
}
