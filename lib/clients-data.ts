// Client/partner content data (issue #34).
// TODO: replace with real CMS-sourced copy once #17 (Headless CMS) merges.
//
// NOTE (i18n): `category` is a UI-facing label so it's localized —
// `en` authored, `fa` best-effort draft flagged for native-speaker
// review, `az`/`tr` fall back to `en` until translated.
// `name`, `logo`, `link` are not localized (proper noun / assets / URL).

import type { Localized } from "@/lib/content/types";

export interface ClientPartnerRecord {
  id: string;
  name: string;
  logo: {
    url: string;
    alt: string;
  };
  link: string;
  category: Localized<string>;
  order: number;
  published: boolean;
}

export const clientsData: ClientPartnerRecord[] = [
  {
    id: "client-1",
    name: "Placeholder Client One",
    logo: { url: "/images/clients/client-1.svg", alt: "Placeholder Client One logo" },
    link: "https://example.com",
    category: { en: "Client", fa: "مشتری" },
    order: 1,
    published: true,
  },
  {
    id: "client-2",
    name: "Placeholder Client Two",
    logo: { url: "/images/clients/client-2.svg", alt: "Placeholder Client Two logo" },
    link: "https://example.com",
    category: { en: "Client", fa: "مشتری" },
    order: 2,
    published: true,
  },
  {
    id: "partner-1",
    name: "Placeholder Partner One",
    logo: { url: "/images/clients/partner-1.svg", alt: "Placeholder Partner One logo" },
    link: "https://example.com",
    category: { en: "Technology Partner", fa: "شریک فناوری" },
    order: 3,
    published: true,
  },
  {
    id: "partner-2",
    name: "Placeholder Partner Two",
    logo: { url: "/images/clients/partner-2.svg", alt: "Placeholder Partner Two logo" },
    link: "https://example.com",
    category: { en: "Supplier", fa: "تأمین‌کننده" },
    order: 4,
    published: true,
  },
];
