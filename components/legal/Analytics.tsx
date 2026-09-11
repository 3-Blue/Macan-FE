import Script from "next/script";

/**
 * Loads Plausible Analytics on the client.
 *
 * Plausible is cookieless and collects no personal data, so — unlike the
 * previous GA4 setup — no cookie-consent gate is required here. The script
 * loads unconditionally once NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC is set (left
 * unset in local dev so local traffic doesn't pollute real analytics).
 */
export function Analytics() {
  const plausibleSrc = process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC;

  if (!plausibleSrc) return null;

  return (
    <>
      <Script src={plausibleSrc} strategy="afterInteractive" />
      <Script id="plausible-init" strategy="afterInteractive">
        {`
          window.plausible = window.plausible || function () {
            (window.plausible.q = window.plausible.q || []).push(arguments);
          };
          window.plausible.init = window.plausible.init || function (i) {
            window.plausible.o = i || {};
          };
          window.plausible.init();
        `}
      </Script>
    </>
  );
}