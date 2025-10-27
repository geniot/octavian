create table "stats"
(
    id              integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tune_id         integer                                                         not null,
    user_id         integer                                                         not null,
    best_score      integer   default 0                                             not null,
    last_updated_on bigint    default (EXTRACT(epoch FROM now()) * (1000)::numeric) not null,
    performances    text,
    unlocked_on     timestamp default now()                                         not null,
    credits         integer   default 0                                             not null
);

alter table stats
    add constraint fk_stats_tune_id foreign key (tune_id) references tunes (id);

alter table stats
    add constraint fk_stats_user_id foreign key (user_id) references users (id);

create unique index tune_id_user_id
    on "stats" (tune_id, user_id);

