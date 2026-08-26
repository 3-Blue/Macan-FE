import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Exclude api, the Payload admin panel, next internals and any file with an
  // extension. Everything else is locale-routed by next-intl.
  matcher: ["/((?!api|admin|trpc|_next|_vercel|.*\\..*).*)"],
};
