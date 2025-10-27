create type tune_instrument as enum ('PIANO', 'ACCORDION');
create table "tunes"
(
    id               integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    owner_id         integer                                                       not null,
    title            varchar(255)                                                  not null,
    author           varchar(255)                                                  not null,
    instrument       tune_instrument                                               not null,
    last_updated_on  bigint  default (EXTRACT(epoch FROM now()) * (1000)::numeric) not null,
    png              bytea                                                         not null,
    cover            text,
    level_num        integer default 0                                             not null,
    position_num     integer default 0                                             not null,
    json             text,
    mp3              bytea,
    mscx             text                                                          not null,
    png_width        integer default 0                                             not null,
    png_height       integer default 0                                             not null,
    selection_ranges varchar(255)
);

alter table tunes
    add constraint fk_tunes_owner_id foreign key (owner_id) references users (id);

create unique index level_position_instrument_owner_uindex
    on "tunes" (level_num, position_num, instrument, owner_id);

