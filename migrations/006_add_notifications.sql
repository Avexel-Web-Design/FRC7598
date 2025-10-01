-- Track user's last read per channel/DM
CREATE TABLE IF NOT EXISTS user_read_status (
  user_id INTEGER NOT NULL,
  channel_id TEXT NOT NULL,
  last_read_timestamp TEXT NOT NULL,
  PRIMARY KEY (user_id, channel_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_user_read_status_user_id ON user_read_status(user_id);
CREATE INDEX IF NOT EXISTS idx_user_read_status_channel_id ON user_read_status(channel_id);
