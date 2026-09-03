// Industry content data (issues #26, #27, #28, #100).
// Sectors match the values used in lib/projects-data.ts (#30) so
// relatedProjectSlugs and sector-filtered links return real results.
// TODO: replace with real CMS-sourced copy once #17 (Headless CMS) merges.
//
// NOTE (i18n, #100): `en` is authored copy; `fa` is a best-effort draft
// translation, flagged for native-speaker review before launch. `az`/`tr`
// fall back to `en` until translated — add them here or in the CMS without
// touching the adapter or page component.

import type { Localized } from "@/lib/content/types";

export interface IndustryRecord {
  id: string;
  slug: string;
  name: Localized<string>;
  summary: Localized<string>;
  icon: string;
  heroImage?: {
    url: string;
    alt: string;
  };
  description: Localized<string>;
  challenges: Localized<string[]>;
  solutions: Localized<string[]>;
  relatedServiceSlugs: string[];
  relatedProjectSlugs: string[];
  order: number;
  published: boolean;
}

export const industriesData: IndustryRecord[] = [
  {
    id: "oil-and-gas",
    slug: "oil-and-gas",
    name: { en: "Oil & Gas", fa: "نفت و گاز" },
    summary: {
      en: "Engineering and construction support across upstream and offshore operations.",
      fa: "پشتیبانی مهندسی و ساخت در عملیات بالادستی و فراساحلی.",
    },
    icon: "droplet",
    description: {
      en: "MACAN supports oil & gas operators across the full project lifecycle, from offshore platform engineering to refit and turnaround work, delivering under demanding safety and regulatory conditions.",
      fa: "ماکان از اپراتورهای نفت و گاز در طول چرخه کامل پروژه، از مهندسی سکوهای فراساحلی تا کارهای بازسازی و تعمیرات اساسی، پشتیبانی می‌کند و در شرایط سختگیرانه ایمنی و مقرراتی خدمات ارائه می‌دهد.",
    },
    challenges: {
      en: [
        "Aging offshore infrastructure requiring careful, safety-critical refits",
        "Strict regulatory and environmental compliance requirements",
        "Remote, harsh operating environments with limited logistics windows",
      ],
      fa: [
        "زیرساخت‌های فراساحلی قدیمی که نیازمند بازسازی دقیق و ایمنی‌محور هستند",
        "الزامات سختگیرانه انطباق با مقررات و محیط زیست",
        "محیط‌های عملیاتی دورافتاده و دشوار با پنجره‌های لجستیکی محدود",
      ],
    },
    solutions: {
      en: [
        "Structural and mechanical engineering for platform refits and life extension",
        "Turnaround planning that minimizes production downtime",
        "HSE-first execution frameworks tailored to offshore conditions",
      ],
      fa: [
        "مهندسی سازه‌ای و مکانیکی برای بازسازی و افزایش عمر سکوها",
        "برنامه‌ریزی تعمیرات اساسی برای کاهش زمان توقف تولید",
        "چارچوب‌های اجرایی مبتنی بر ایمنی متناسب با شرایط فراساحلی",
      ],
    },
    relatedServiceSlugs: ["engineering"],
    relatedProjectSlugs: ["p1"],
    order: 1,
    published: true,
  },
  {
    id: "power",
    slug: "power",
    name: { en: "Power", fa: "برق" },
    summary: {
      en: "Generation and grid infrastructure projects, from expansion to commissioning.",
      fa: "پروژه‌های تولید و زیرساخت شبکه، از توسعه تا راه‌اندازی.",
    },
    icon: "zap",
    description: {
      en: "From combined-cycle plant expansions to grid infrastructure, MACAN delivers power projects that keep pace with growing demand while meeting strict commissioning timelines.",
      fa: "از توسعه نیروگاه‌های سیکل ترکیبی تا زیرساخت شبکه، ماکان پروژه‌های برق را با رعایت زمان‌بندی‌های دقیق راه‌اندازی و همگام با تقاضای رو به رشد اجرا می‌کند.",
    },
    challenges: {
      en: [
        "Growing demand requiring rapid capacity expansion",
        "Complex commissioning and integration with existing grid infrastructure",
        "Coordinating multiple engineering disciplines on tight schedules",
      ],
      fa: [
        "تقاضای رو به رشد که نیازمند افزایش سریع ظرفیت است",
        "راه‌اندازی و یکپارچه‌سازی پیچیده با زیرساخت موجود شبکه",
        "هماهنگی رشته‌های مختلف مهندسی در زمان‌بندی‌های فشرده",
      ],
    },
    solutions: {
      en: [
        "End-to-end expansion engineering, from design through commissioning",
        "Grid integration planning that minimizes service disruption",
        "Multi-discipline project management to keep timelines on track",
      ],
      fa: [
        "مهندسی کامل توسعه، از طراحی تا راه‌اندازی",
        "برنامه‌ریزی یکپارچه‌سازی شبکه با حداقل اختلال در خدمات",
        "مدیریت پروژه چند رشته‌ای برای حفظ زمان‌بندی",
      ],
    },
    relatedServiceSlugs: ["engineering", "construction"],
    relatedProjectSlugs: ["p2"],
    order: 2,
    published: true,
  },
  {
    id: "infrastructure",
    slug: "infrastructure",
    name: { en: "Infrastructure", fa: "زیرساخت" },
    summary: {
      en: "Roads, utilities, and public works delivered for municipal and government clients.",
      fa: "جاده‌ها، تأسیسات و پروژه‌های عمومی برای مشتریان شهرداری و دولتی.",
    },
    icon: "building-2",
    description: {
      en: "MACAN delivers public infrastructure projects — from highway interchanges to district utility networks — built for long-term reliability and municipal accountability.",
      fa: "ماکان پروژه‌های زیرساخت عمومی — از تقاطع‌های بزرگراهی تا شبکه‌های تأسیسات منطقه‌ای — را برای قابلیت اطمینان بلندمدت و پاسخگویی شهرداری اجرا می‌کند.",
    },
    challenges: {
      en: [
        "Coordinating with municipal stakeholders and public timelines",
        "Minimizing disruption to existing traffic and utility networks",
        "Meeting public accountability and reporting requirements",
      ],
      fa: [
        "هماهنگی با ذینفعان شهرداری و زمان‌بندی‌های عمومی",
        "کاهش اختلال در ترافیک موجود و شبکه‌های تأسیساتی",
        "برآورده‌سازی الزامات پاسخگویی عمومی و گزارش‌دهی",
      ],
    },
    solutions: {
      en: [
        "Phased construction planning to keep infrastructure operational during works",
        "Transparent stakeholder communication and progress reporting",
        "Utility-network engineering built for decades of reliable service",
      ],
      fa: [
        "برنامه‌ریزی ساخت مرحله‌ای برای حفظ عملکرد زیرساخت حین اجرای کار",
        "ارتباط شفاف با ذینفعان و گزارش‌دهی پیشرفت",
        "مهندسی شبکه تأسیسات برای دهه‌ها خدمات قابل اعتماد",
      ],
    },
    relatedServiceSlugs: ["construction", "project-management"],
    relatedProjectSlugs: ["p3", "p5"],
    order: 3,
    published: true,
  },
  {
    id: "supply",
    slug: "supply",
    name: { en: "Supply", fa: "تأمین" },
    summary: {
      en: "Fabrication and supply chain solutions for industrial and process equipment.",
      fa: "راهکارهای ساخت و زنجیره تأمین برای تجهیزات صنعتی و فرآیندی.",
    },
    icon: "package",
    description: {
      en: "MACAN's supply arm delivers fabricated process equipment and modular skids, backed by a supply chain built for industrial-grade quality and delivery reliability.",
      fa: "بخش تأمین ماکان تجهیزات فرآیندی ساخته‌شده و اسکیدهای ماژولار را ارائه می‌دهد که توسط زنجیره تأمینی با کیفیت صنعتی و قابلیت اطمینان تحویل پشتیبانی می‌شود.",
    },
    challenges: {
      en: [
        "Sourcing and quality-assuring components across a complex supply chain",
        "Meeting fabrication tolerances for process-critical equipment",
        "Coordinating delivery logistics for oversized modular units",
      ],
      fa: [
        "تأمین و تضمین کیفیت اجزا در یک زنجیره تأمین پیچیده",
        "برآورده‌سازی تلورانس‌های ساخت برای تجهیزات حیاتی فرآیند",
        "هماهنگی لجستیک تحویل برای واحدهای ماژولار بزرگ",
      ],
    },
    solutions: {
      en: [
        "In-house fabrication quality control at every production stage",
        "Modular skid design optimized for transport and on-site installation",
        "Supplier network vetted for industrial process equipment standards",
      ],
      fa: [
        "کنترل کیفیت ساخت داخلی در هر مرحله تولید",
        "طراحی اسکید ماژولار بهینه‌شده برای حمل‌ونقل و نصب در محل",
        "شبکه تأمین‌کنندگان ارزیابی‌شده مطابق استانداردهای تجهیزات فرآیندی صنعتی",
      ],
    },
    relatedServiceSlugs: ["supply"],
    relatedProjectSlugs: ["p4"],
    order: 4,
    published: true,
  },
];