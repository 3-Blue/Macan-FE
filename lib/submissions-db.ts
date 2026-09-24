import { getPayload } from "payload";
import config from "@payload-config";

/**
 * Persists contact-form submissions to Payload (Postgres) via the Local API.
 *
 * Server-side only. The Local API bypasses access control, so this writes
 * successfully even though the `contact-submissions` collection blocks public
 * `create`. Unlike the previous SQLite file store, this is safe on serverless
 * hosting (Vercel) because state lives in Postgres, not the local filesystem.
 */
export interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
  ip: string;
}

export async function saveSubmission(
  submission: ContactSubmission,
): Promise<void> {
  const payload = await getPayload({ config });
  await payload.create({
    collection: "contact-submissions",
    data: submission,
  });
}
