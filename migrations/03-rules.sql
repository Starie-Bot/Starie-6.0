BEGIN;

CREATE TABLE IF NOT EXISTS rules (id varchar(15) unique, rule text, message_id text, guild_id text);

END;
