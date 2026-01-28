const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

let sql = '-- Migration data for Cloudflare D1\n';

console.log('Generating Products SQL...');
for (const p of db.products) {
    sql += `INSERT INTO products (id, name, description, full_description, image, status, tiers, features, price, original_price) VALUES ('${p.id}', '${p.name.replace(/'/g, "''")}', '${(p.description || '').replace(/'/g, "''")}', '${(p.fullDescription || '').replace(/'/g, "''")}', '${p.image}', '${p.status}', '${JSON.stringify(p.tiers).replace(/'/g, "''")}', '${JSON.stringify(p.features).replace(/'/g, "''")}', ${p.price}, ${p.originalPrice});\n`;
}

console.log('Generating Settings SQL...');
if (db.settings) {
    sql += `INSERT INTO settings (key, value) VALUES ('store_settings', '${JSON.stringify(db.settings).replace(/'/g, "''")}');\n`;
}

fs.writeFileSync(path.join(__dirname, '..', 'scripts', 'seed-d1.sql'), sql);
console.log('Done! seed-d1.sql created.');
