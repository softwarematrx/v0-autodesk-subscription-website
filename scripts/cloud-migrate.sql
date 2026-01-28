-- Migration script for Cloudflare D1 (SQLite)
DROP TABLE IF EXISTS products;
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  full_description TEXT,
  image TEXT,
  status TEXT DEFAULT 'active',
  tiers TEXT, -- JSON string
  features TEXT, -- JSON string
  price REAL,
  original_price REAL,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS orders;
CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  product TEXT,
  amount REAL,
  status TEXT DEFAULT 'processing',
  date DATETIME DEFAULT CURRENT_TIMESTAMP,
  stripe_session_id TEXT
);

DROP TABLE IF EXISTS settings;
CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value TEXT, -- JSON string
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS messages;
CREATE TABLE messages (
  id TEXT PRIMARY KEY,
  name TEXT,
  email TEXT,
  subject TEXT,
  message TEXT,
  status TEXT DEFAULT 'unread',
  date DATETIME DEFAULT CURRENT_TIMESTAMP
);
