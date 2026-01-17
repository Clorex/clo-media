require("dotenv").config({ path: ".env.neon.local" });

const { neon } = require("@neondatabase/serverless");

async function main() {
  const url =
    process.env.DATABASE_URL_UNPOOLED ||
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL_NON_POOLING ||
    process.env.POSTGRES_URL;

  if (!url) throw new Error("Missing database url in .env.neon.local");

  const sql = neon(url);

  await sql.query(`create extension if not exists "pgcrypto";`);

  await sql.query(`
    create table if not exists users (
      id uuid primary key default gen_random_uuid(),
      email text not null unique,
      password_hash text not null,
      full_name text not null,
      phone text not null,
      role text not null default 'customer',
      created_at timestamptz not null default now()
    );
  `);

  await sql.query(`
    create table if not exists bookings (
      id uuid primary key default gen_random_uuid(),
      user_id uuid not null references users(id) on delete cascade,
      service text not null,
      details jsonb not null default '{}'::jsonb,
      status text not null default 'pending_review',
      payment_submitted boolean not null default false,
      created_at timestamptz not null default now()
    );
  `);

  await sql.query(`
    create table if not exists payment_proofs (
      id uuid primary key default gen_random_uuid(),
      booking_id uuid not null references bookings(id) on delete cascade,
      user_id uuid not null references users(id) on delete cascade,
      reference text,
      file_name text not null,
      file_type text not null,
      file_bytes bytea not null,
      created_at timestamptz not null default now(),
      constraint payment_proof_max_size check (octet_length(file_bytes) <= 3000000)
    );
  `);

  await sql.query(`
    create table if not exists assistant_threads (
      id uuid primary key default gen_random_uuid(),
      user_id uuid references users(id) on delete set null,
      created_at timestamptz not null default now()
    );
  `);

  await sql.query(`
    create table if not exists assistant_messages (
      id uuid primary key default gen_random_uuid(),
      thread_id uuid not null references assistant_threads(id) on delete cascade,
      user_id uuid references users(id) on delete set null,
      sender text not null,
      message text not null,
      created_at timestamptz not null default now()
    );
  `);

  console.log("Migration complete");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});