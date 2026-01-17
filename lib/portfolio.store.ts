import { sql } from "@/lib/db";

export type PortfolioItem = {
  id: number;
  title: string;
  category: string;
  tags: string[];
  image_url: string;
  active: boolean;
  created_at: string;
};

function toRows(result: any) {
  if (!result) return [];
  if (Array.isArray(result)) return result;
  if (Array.isArray(result.rows)) return result.rows;
  return [];
}

export async function getPublicPortfolioItems(limit = 60): Promise<PortfolioItem[]> {
  try {
    const res = await sql.query(
      `select id, title, category, tags, image_url, active, created_at
       from portfolio_items
       where active=true
       order by created_at desc
       limit $1`,
      [limit]
    );
    return toRows(res) as PortfolioItem[];
  } catch {
    return [];
  }
}

export async function getAdminPortfolioItems(limit = 300): Promise<PortfolioItem[]> {
  const res = await sql.query(
    `select id, title, category, tags, image_url, active, created_at
     from portfolio_items
     order by created_at desc
     limit $1`,
    [limit]
  );
  return toRows(res) as PortfolioItem[];
}