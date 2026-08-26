import type { Localized } from "@/lib/content/types";

/**
 * Service teaser content.
 *
 * NOTE: `en` is authored copy; `fa` is provided for the primary non-English
 * audience. `az`/`tr` fall back to `en` until translated (see the CMS
 * migration) — add them here or in the CMS without touching any component.
 *
 * NOTE (content): these four categories (engineering / construction / supply /
 * project management) don't match the export/import positioning used in the
 * Hero and Services intro copy. Reconcile the brand story before launch.
 */
export interface ServiceRecord {
  slug: string;
  title: Localized<string>;
  description: Localized<string>;
}

export const services: ServiceRecord[] = [
  {
    slug: "engineering",
    title: { en: "Engineering", fa: "مهندسی" },
    description: {
      en: "Technical design and engineering services across every project phase.",
      fa: "خدمات طراحی فنی و مهندسی در تمام مراحل پروژه.",
    },
  },
  {
    slug: "construction",
    title: { en: "Construction", fa: "ساخت‌وساز" },
    description: {
      en: "End-to-end construction execution, from groundwork to handover.",
      fa: "اجرای کامل ساخت‌وساز، از عملیات خاکی تا تحویل.",
    },
  },
  {
    slug: "supply",
    title: { en: "Supply", fa: "تأمین" },
    description: {
      en: "Reliable sourcing and supply chain management for materials and equipment.",
      fa: "تأمین مطمئن و مدیریت زنجیره تأمین مواد و تجهیزات.",
    },
  },
  {
    slug: "project-management",
    title: { en: "Project Management", fa: "مدیریت پروژه" },
    description: {
      en: "Coordinated planning and oversight to keep projects on time and on budget.",
      fa: "برنامه‌ریزی و نظارت هماهنگ برای اجرای پروژه‌ها در زمان و بودجه مقرر.",
    },
  },
];
