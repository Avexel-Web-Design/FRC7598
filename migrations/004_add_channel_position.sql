-- Add position column to channels for ordering
ALTER TABLE channels ADD COLUMN position INTEGER DEFAULT 0;
UPDATE channels SET position = 1 WHERE id = 'general';
UPDATE channels SET position = 2 WHERE id = 'random';
UPDATE channels SET position = 3 WHERE id = 'development';
UPDATE channels SET position = 4 WHERE id = 'announcements';
CREATE INDEX IF NOT EXISTS idx_channels_position ON channels(position);
