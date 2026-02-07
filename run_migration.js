const mysql = require('mysql2/promise');
require('dotenv').config({ path: './backend/.env' });
const fs = require('fs');

async function run() {
    const conn = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        multipleStatements: true
    });

    const schema = fs.readFileSync('./backend/schema.sql', 'utf8');
    // Only execute the part after the initial setup if needed, 
    // but multipleStatements: true handles the whole file better.
    const queries = schema.split(';').filter(q => q.trim());

    for (let query of queries) {
        try {
            if (query.toUpperCase().includes('CREATE TABLE')) {
                await conn.query(query);
            }
        } catch (e) {
            if (!e.message.includes('already exists')) {
                console.error('Error executing query:', query);
                console.error(e);
            }
        }
    }

    console.log('Schema updated successfully');
    await conn.end();
}

run().catch(err => {
    console.error(err);
    process.exit(1);
});
