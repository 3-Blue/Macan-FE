import Database from "better-sqlite3";
import path from "node:path";

/**
 * Persists contact-form submissions to a local SQLite file.
 *
 * Safe on this project's VPS deployment because the Node process is
 * long-lived (PM2), so the filesystem persists between requests — this
 * would NOT be safe on a serverless platform like Vercel, where the
 * filesystem resets between invocations.
 *
 * Path is configurable via CONTACT_DB_PATH so production can point outside
 * the repo directory (recommended, so `git clean` or a fresh clone can
 * never touch it). Defaults to ./macan-fe.db for local dev.
 */
const dbPath = process.env.CONTACT_DB_PATH ?? path.join(process.cwd(), "macan-fe.db");

const db = new Database(dbPath);
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS contact_submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    ip TEXT NOT NULL,
    created_at TEXT NOT NULL
  )
`);

export interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
  ip: string;
}

export function saveSubmission(submission: ContactSubmission): void {
  db.prepare(
    `INSERT INTO contact_submissions (name, email, subject, message, ip, created_at)
     VALUES (@name, @email, @subject, @message, @ip, @created_at)`
  ).run({ ...submission, created_at: new Date().toISOString() });
}