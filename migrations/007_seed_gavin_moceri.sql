-- Seed user: Gavin Moceri (password: "password")
-- SHA-256("password") = 5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8
INSERT OR IGNORE INTO users (full_name, password_hash, is_admin)
VALUES ('Gavin Moceri', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 0);
