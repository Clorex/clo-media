create table if not exists testimonial_chats (
  id bigserial primary key,
  customer_name text not null,
  service text not null,
  customer_message text not null,
  our_reply text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists testimonial_chats_active_created_at_idx
  on testimonial_chats(active, created_at desc);

-- prevent duplicates (needed for seed endpoint)
create unique index if not exists testimonial_chats_unique_idx
  on testimonial_chats(customer_name, service, customer_message, our_reply);