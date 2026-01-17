import { seedTestimonials } from "@/lib/testimonials.seed";
import { sql } from "@/lib/db";

export type DbTestimonial = {
  id: number;
  name: string;
  service: string;
  text: string;
  active: boolean;
  created_at: string;
};

function toRows(result: any) {
  if (!result) return [];
  if (Array.isArray(result)) return result;
  if (Array.isArray(result.rows)) return result.rows;
  return [];
}

export async function getPublicTestimonials(limit = 100) {
  try {
    const res = await sql.query(
      `select id, name, service, message as text, active, created_at
       from testimonials
       where active=true
       order by random()
       limit $1`,
      [limit]
    );
    const rows = toRows(res);
    if (rows.length) return rows as DbTestimonial[];
  } catch {
    // table might not exist yet, fallback to seed
  }
  return seedTestimonials.slice(0, limit);
}

export async function getAdminTestimonials(limit = 300) {
  const res = await sql.query(
    `select id, name, service, message as text, active, created_at
     from testimonials
     order by created_at desc
     limit $1`,
    [limit]
  );
  return toRows(res) as DbTestimonial[];
}