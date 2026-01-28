const { Pool } = require('@neondatabase/serverless');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function seed() {
    const dbPath = path.join(__dirname, '..', 'data', 'db.json');
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

    console.log('Seeding products to Neon...');

    for (const product of db.products) {
        await pool.query(
            `INSERT INTO products (id, name, description, full_description, image, status, tiers, features, price, original_price)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       ON CONFLICT (id) DO UPDATE SET
       name = EXCLUDED.name,
       description = EXCLUDED.description,
       full_description = EXCLUDED.full_description,
       image = EXCLUDED.image,
       tiers = EXCLUDED.tiers,
       features = EXCLUDED.features,
       price = EXCLUDED.price,
       original_price = EXCLUDED.original_price`,
            [
                product.id,
                product.name,
                product.description,
                product.fullDescription || '',
                product.image,
                product.status,
                JSON.stringify(product.tiers),
                JSON.stringify(product.features),
                product.price,
                product.originalPrice
            ]
        );
    }

    console.log('Seeding orders...');
    for (const order of (db.orders || [])) {
        await pool.query(
            `INSERT INTO orders (id, email, product, amount, status)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (id) DO NOTHING`,
            [order.id, order.email, order.product, order.amount, order.status]
        );
    }

    console.log('Done!');
    process.exit(0);
}

seed().catch(err => {
    console.error(err);
    process.exit(1);
});
