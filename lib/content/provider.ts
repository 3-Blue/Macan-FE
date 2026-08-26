import type { ContentSource } from "@/lib/content/types";
import { localContentSource } from "@/lib/content/adapters/local";

/**
 * Selects the active content backend.
 *
 * Today only the local (in-repo) adapter exists. When the Payload adapter
 * lands, add it here and switch on an env flag, e.g.:
 *
 *   if (process.env.CONTENT_SOURCE === "payload") return payloadContentSource;
 *
 * so the rest of the app keeps calling lib/content unchanged.
 */
export function getContentSource(): ContentSource {
  return localContentSource;
}
