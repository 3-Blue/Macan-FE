# گزارش ریفکتور پروژه macan-fe

این سند خلاصه‌ی کاملِ بررسی و بازنویسی پروژه است: چه چیزهایی خراب بود، چه چیزی
تغییر کرد، هر پچ چه می‌کند، و چه کارهایی برای شماست که تصمیم/تکمیل کنید.

مسیر معماری انتخاب‌شده: **A** — دیپلوی روی سرور Node (Vercel یا میزبان دائمی) +
**Payload CMS** + Postgres.

> همه‌ی تغییرها با `tsc --noEmit`، `eslint .` و `next build` اعتبارسنجی شده‌اند.
> بیلد نهایی موفق است؛ همه‌ی صفحات `/[locale]` به‌صورت SSG پیش‌رندر می‌شوند و
> فقط `/api/contact` داینامیک است.

---

## ۱) تصویر کلی پروژه

سایت شرکتی Next.js **16.2.9** با App Router، MUI 9، `next-intl` و چهار زبان
(`en`, `fa`, `az`, `tr`). صفحه‌ها: خانه، درباره، خدمات، صنایع (+جزئیات)، تماس،
حریم خصوصی، شرایط. انیمیشن با framer-motion، فرم تماس با Resend.

### علت ریشه‌ای بیشتر باگ‌ها
کد **سرور-محور** نوشته شده بود (API route، middleware/proxy، خواندن `cookies()`)
اما به‌صورت **static export روی GitHub Pages** دیپلوی می‌شد؛ جایی که هیچ‌کدام از
این‌ها اجرا نمی‌شوند. این تضاد، منشأ خرابی فرم تماس، آنالیتیکس و redirectها بود.

---

## ۲) فهرست کامل مشکلات یافته‌شده

### بحرانی
1. **CMS مرده و ناهماهنگ:** کل `lib/cms/`, `content/homepage.json`, `types/cms/`
   هیچ‌جا import نمی‌شد، محتوایش قدیمی بود (hero: «Build faster» در حالی‌که سایت
   «export/import» را نشان می‌دهد) و فقط `en`/`fa` را مدل کرده بود.
2. **فرم تماس در پروداکشن کار نمی‌کرد:** POST به `/api/contact` روی static export
   بی‌اثر است.
3. **آنالیتیکس/کوکی خراب:** `layout` با `cookies()` سرور تصمیم به لود GA می‌گرفت؛
   روی HTML استاتیک ممکن نیست + همین باعث می‌شد همه‌ی صفحات **داینامیک** رندر شوند.
4. **`npm run build` محلی crash می‌کرد:** اسکریپت `postbuild` همیشه در `out/`
   می‌نوشت که فقط در بیلد Pages وجود دارد.
5. **دیتابیس یتیم `macan-fe.db`:** یک دیتابیس SQLite از تلاش نیمه‌کاره‌ی قبلی
   Payload (جدول‌های `payload_*`, `users`, `media`) که commit شده بود.

### مهم
6. **متن‌های انگلیسی هاردکد** در Header/Footer و هدینگ‌ها روی سایت چندزبانه.
7. **افت locale در لینک‌ها:** استفاده از `next/link` به‌جای `Link` محلی‌شده در
   Footer، Hero، بنر کوکی و کاروسل → کلیک روی لینک زبان را می‌انداخت.
8. **لینک ۴۰۴ در منو:** منو به `/projects` (بدون صفحه) لینک می‌داد و `/industries`
   (که وجود دارد) در منو نبود؛ کارت‌های کاروسل هم به `/projects/*` ناموجود می‌رفتند.
9. **کد مرده:** `TimelineSection` و `LogoWallMarquee` هیچ‌جا mount نشده بودند و
   ترجمه‌ی `Timeline` فقط در `en` وجود داشت.
10. **پراکندگی منبع محتوا:** محتوا در چهار جای ناسازگار بود (پیام‌های next-intl،
    فایل‌های TS انگلیسی‌فقط، ثابت‌های داخل کامپوننت، و JSON مرده).

### متوسط/جزئی
11. **`sitemap.ts` ناقص:** فقط ۳ مسیر انگلیسی، بدون prefix زبان و بدون hreflang.
12. **`lint` ناقص:** اسکریپت `eslint` بدون مسیر.
13. کامنت‌های stale (مثلاً «required for output: export» و TODOهای مربوط به فونت
    در `theme.ts`)، و URL هاردکد در metadata/robots/sitemap.
14. خطای lint واقعی: `set-state-in-effect` در `CookieConsentBanner` (React 19).

> **مشکل محتوایی (تصمیم با شماست):** تناقض هویت برند — Hero می‌گوید صادرات/واردات
> اما خدمات/صنایع «مهندسی/ساخت‌وساز» هستند. این یک تصمیم کسب‌وکاری است.

---

## ۳) پچ‌ها (به‌ترتیب اعمال)

هر پچ یک commit مستقل است. با `git am *.patch` یا تک‌تک `git apply` اعمال کنید.

| # | عنوان | خلاصه |
|---|-------|-------|
| 0001 | chore(build) | رفع crash بیلد محلی (`postbuild` guard) + `eslint .` + اسکریپت `typecheck` |
| 0002 | refactor(remove dead CMS) | حذف `lib/cms`, `content/homepage.json`, `types/cms` |
| 0003 | fix(i18n,nav) | منو/فوتر ترجمه‌شده (۴ زبان)، مسیرهای درست، لینک‌های locale-aware، حذف ۴۰۴ها |
| 0004 | fix(i18n headings) | ترجمه‌ی «What We Do» / «What Our Clients Say» |
| 0005 | refactor(content) | **لایه‌ی محتوای واحد `lib/content`** با آداپتر قابل‌تعویض؛ سیم‌کشی صفحه‌ها |
| 0006 | build(deploy) | مهاجرت به Vercel؛ حذف کامل هک‌های GitHub Pages؛ افزودن CI |
| 0007 | refactor(analytics) | آنالیتیکس کلاینت‌ساید و consent-gated؛ صفحه‌ها دوباره SSG شدند |
| 0008 | fix(seo) | sitemap کامل با hreflang + `lib/site.ts` |
| 0009 | feat(cms) | **اسکافولد Payload 3** + آداپتر + راهنمای کامل (`docs/CMS-PAYLOAD.md`) |

### نکته درباره‌ی حذف‌ها
- `macan-fe.db` قبلاً در `.gitignore` بود؛ اگر در ریپوی شما track شده، یک‌بار
  `git rm --cached macan-fe.db && git commit` بزنید.
- `TimelineSection`/`LogoWallMarquee` را **حذف نکردم**؛ کد سالمی هستند و احتمالاً
  برای صفحه‌ی «درباره» در نظر بوده‌اند. اگر لازم ندارید حذفشان کنید؛ اگر می‌خواهید
  استفاده کنید، فقط باید namespaceی `Timeline` را به `fa/az/tr` هم اضافه کنید
  (الان فقط در `en` است) و در صفحه mount کنید.

---

## ۴) لایه‌ی محتوای جدید (`lib/content`) — هسته‌ی مقیاس‌پذیری

```
lib/content/
  index.ts            # تنها نقطه‌ی import برای خواندن محتوا
  types.ts            # مدل‌ها + Localized<T> + resolve() با fallback به en
  provider.ts         # انتخاب backend با env (local | payload)
  adapters/local.ts   # آداپتر داده‌ی داخل ریپو (locale-resolved)
  data/               # داده‌ی منبع (services با fa؛ testimonials/projects دمو)
```

- صفحه‌ها (Server Component) محتوا را با `await getServices(locale)` و … می‌گیرند
  و به کامپوننت‌های presentational به‌صورت prop می‌دهند.
- getterها **async** هستند تا آداپتر Payload بدون تغییرِ صفحه‌ها جایگزین شود.
- ترجمه‌ی متن‌های بلند `az`/`tr` را عمداً fabricate نکردم؛ ساختار آماده است و با
  fallback به `en` رندر می‌شود تا در CMS/به‌دست مترجم پر شود.

---

## ۵) CMS: Payload

جزئیات کامل در `docs/CMS-PAYLOAD.md`. خلاصه:

- Payload برای Next 16.2.x نیازمند **نسخه ≥ 3.73** است (پروژه روی 16.2.9 ✓).
- **میزبانی:** Payload برای سرور Node **دائمی** طراحی شده. روی Vercel serverless
  برای ترافیک کم کار می‌کند اما در مقیاس، مشکل connection-pool/timeout دارد؛ برای
  مقیاس‌پذیری میزبان دائمی (**Railway/Render/Fly** یا Docker+VPS) بهتر است.
- فایل‌های Payload به‌صورت `*.example` هستند تا بیلد فعلی سبز بماند؛ بعد از نصب
  Payload و راه‌اندازی Postgres، طبق راهنما rename و فعال می‌شوند. فعال‌سازی آداپتر
  فقط یک خط در `lib/content/provider.ts` است.

> صادقانه: بخش Payload به‌صورت **اسکافولد + راهنمای تأییدشده** تحویل شده، نه یک
> بیلد runtime اجراشده — چون اجرای واقعی‌اش به Postgres و تصمیم میزبانی در محیط
> شما نیاز دارد. کد config/collections/adapter آماده‌ی کپی است.

---

## ۶) کارهای باقی‌مانده برای شما (به‌ترتیب اولویت)

1. **تصمیم هویت برند:** «صادرات/واردات» یا «مهندسی/ساخت‌وساز»؟ سپس copy را در
   `messages/*` و `lib/content/data/*` یکدست کنید.
2. **راه‌اندازی Payload:** طبق `docs/CMS-PAYLOAD.md` (نصب deps، Postgres، rename
   فایل‌ها، `withPayload` در `next.config.ts`، مسیرهای `app/(payload)`، سپس
   `CONTENT_SOURCE=payload`).
3. **دیپلوی روی Vercel/میزبان:** ریپو را به Vercel وصل کنید و env بدهید
   (`NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `CONTACT_EMAIL_TO/FROM`,
   `NEXT_PUBLIC_GA_ID`). فرم تماس و proxy حالا کار می‌کنند.
4. **صفحات جزئیات خدمات/پروژه‌ها:** فعلاً `/services/[slug]` و پروژه‌ها صفحه‌ی
   جزئیات ندارند؛ کارت‌های پروژه عمداً بدون لینک‌اند. این‌ها را به‌عنوان
   collection/route بعدی اضافه کنید.
5. **ترجمه‌ها:** متن‌های بلند `az`/`tr` (خدمات، صنایع، testimonialها) در Payload
   تکمیل شوند.
6. **محتوای placeholder:** آدرس/تلفن/ایمیل تماس، testimonialهای واقعی، متن حریم
   خصوصی/شرایط، و گواهینامه‌ها هنوز placeholder هستند.

---

## ۷) نحوه‌ی اعمال پچ‌ها

```bash
# روی ریپوی خودتان، از ریشه‌ی پروژه:
git checkout -b refactor/cleanup
git am /path/to/patches/*.patch      # هر پچ به‌صورت یک commit اعمال می‌شود
# یا اگر ترجیح می‌دهید دستی:
#   for p in patches/*.patch; do git apply "$p"; done
npm ci
npm run typecheck && npm run lint && npm run build
```

اگر `git am` به‌خاطر تفاوت جزئی درخت با conflict مواجه شد:
`git am --3way` یا `git apply --3way`.
