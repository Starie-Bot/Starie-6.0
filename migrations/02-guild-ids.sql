BEGIN;

ALTER TABLE polls ADD COLUMN IF NOT EXISTS guild_id text;

END;
