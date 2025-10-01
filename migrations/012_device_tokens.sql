-- Create device_tokens to store FCM/APNs tokens per user
CREATE TABLE IF NOT EXISTS device_tokens (
  user_id INTEGER NOT NULL,
  token TEXT PRIMARY KEY,
  platform TEXT,
  updated_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_device_tokens_user ON device_tokens(user_id);
