import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

export function getDb() {
    if (!fs.existsSync(DB_PATH)) {
        return { products: [], settings: {}, orders: [] };
    }
    const data = fs.readFileSync(DB_PATH, 'utf8');
    const db = JSON.parse(data);
    return {
        products: db.products || [],
        settings: db.settings || {},
        orders: db.orders || [],
        messages: db.messages || []
    };
}

export function saveDb(data: any) {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
}
