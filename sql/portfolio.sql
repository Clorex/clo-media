create table if not exists portfolio_items (
  id bigserial primary key,
  title text not null,
  category text not null,
  tags text[] not null default '{}',
  image_url text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists portfolio_items_active_created_at_idx
  on portfolio_items(active, created_at desc);