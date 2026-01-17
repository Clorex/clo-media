import { sql } from "@/lib/db";
import { seedChatTestimonials } from "@/lib/testimonial-chats.seed";

export type DbChatTestimonial = {
  id: number;
  customerName: string;
  service: string;
  customerText: string;
  ourReply: string;
  active: boolean;
  created_at: string;
};

function toRows(result: any) {
  if (!result) return [];
  if (Array.isArray(result)) return result;
  if (Array.isArray(result.rows)) return result.rows;
  return [];
}

export async function getPublicChatTestimonials(limit = 100) {
  try {
    const res = await sql.query(
      `select
        id,
        customer_name as "customerName",
        service,
        customer_message as "customerText",
        our_reply as "ourReply",
        active,
        created_at
      from testimonial_chats
      where active=true
      order by random()
      limit $1`,
      [limit]
    );

    const rows = toRows(res);
    if (rows.length) return rows as DbChatTestimonial[];
  } catch {
    // If table doesn't exist yet, fallback to seed data
  }

  return seedChatTestimonials.slice(0, limit);
}

export async function getAdminChatTestimonials(limit = 400) {
  const res = await sql.query(
    `select
      id,
      customer_name as "customerName",
      service,
      customer_message as "customerText",
      our_reply as "ourReply",
      active,
      created_at
    from testimonial_chats
    order by created_at desc
    limit $1`,
    [limit]
  );

  return toRows(res) as DbChatTestimonial[];
}