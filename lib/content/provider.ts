import type { ContentSource } from "@/lib/content/types";
import { localContentSource } from "@/lib/content/adapters/local";
import { payloadContentSource } from "@/lib/content/adapters/payload";

/**
 * Selects the active content backend via the CONTENT_SOURCE env var.
 * Defaults to the local (in-repo) adapter when unset.
 */
export function getContentSource(): ContentSource {
  if (process.env.CONTENT_SOURCE === "payload") return payloadContentSource;
  return localContentSource;
}