-- Create calendar_events table and basic indexes
DROP TABLE IF EXISTS calendar_events;
CREATE TABLE calendar_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  event_date TEXT NOT NULL,  -- YYYY-MM-DD
  event_time TEXT,           -- HH:MM
  event_end_time TEXT,       -- HH:MM optional end time
  location TEXT,
  created_by INTEGER,
  is_recurring INTEGER DEFAULT 0,
  recurrence_type TEXT,
  recurrence_interval INTEGER,
  recurrence_days_of_week TEXT,
  recurrence_day_of_month INTEGER,
  recurrence_week_of_month INTEGER,
  recurrence_day_of_week TEXT,
  recurrence_months TEXT,
  recurrence_end_type TEXT,
  recurrence_end_date TEXT,
  recurrence_occurrences INTEGER,
  parent_event_id INTEGER,
  recurrence_exceptions TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_calendar_events_date ON calendar_events(event_date);
CREATE INDEX IF NOT EXISTS idx_calendar_events_created_by ON calendar_events(created_by);
CREATE INDEX IF NOT EXISTS idx_calendar_events_recurring ON calendar_events(is_recurring);
CREATE INDEX IF NOT EXISTS idx_calendar_events_parent ON calendar_events(parent_event_id);
CREATE INDEX IF NOT EXISTS idx_calendar_events_recurrence_type ON calendar_events(recurrence_type);
