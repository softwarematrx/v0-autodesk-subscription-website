-- Migration script for Cloudflare/Postgres
CREATE TABLE IF NOT EXISTS products (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  full_description TEXT,
  image VARCHAR(255),
  status VARCHAR(50) DEFAULT 'active',
  tiers JSONB,
  features JSONB,
  price DECIMAL(10, 2),
  original_price DECIMAL(10, 2),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
  id VARCHAR(100) PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  product TEXT,
  amount DECIMAL(10, 2),
  status VARCHAR(50) DEFAULT 'processing',
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  stripe_session_id VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS settings (
  key VARCHAR(100) PRIMARY KEY,
  value JSONB,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS messages (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  subject VARCHAR(255),
  message TEXT,
  status VARCHAR(50) DEFAULT 'unread',
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
