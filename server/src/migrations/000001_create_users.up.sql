create type user_role as enum ('REGISTERED', 'CONFIRMED', 'ADMIN');

create table "users"
(
    id                   integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email                varchar(255)                                                  not null,
    role                 user_role                                                     not null,
    password_hash        varchar(255)                                                  not null,
    reset_token          varchar(255),
    reset_requested_when bigint,
    signup_token         varchar(255)                                                  not null,
    credits              integer default 0                                             not null,
    subscribed_till      bigint  default (EXTRACT(epoch FROM now()) * (1000)::numeric) not null
);

create unique index users_email
    on "users" (email);

create unique index users_reset_token
    on "users" (reset_token);

create unique index users_signup_token
    on "users" (signup_token);

