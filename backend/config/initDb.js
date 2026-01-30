const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

/**
 * Initialize database connection and setup
 * This function will:
 * 1. Connect to MySQL server
 * 2. Create database if it doesn't exist
 * 3. Create tables if they don't exist
 */
async function initializeDatabase() {
    let connection;

    try {
        console.log('🔄 Connecting to MySQL server...');

        // First, connect without specifying a database
        connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            multipleStatements: true // Allow multiple SQL statements
        });

        console.log('✅ Connected to MySQL server successfully');

        // Create database if it doesn't exist
        const dbName = process.env.DB_NAME || 'doctor_appointment_db';
        console.log(`🔄 Creating database '${dbName}' if it doesn't exist...`);

        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
        console.log(`✅ Database '${dbName}' is ready`);

        // Use the database
        await connection.query(`USE \`${dbName}\``);

        // Read and execute schema.sql
        const schemaPath = path.join(__dirname, '..', 'schema.sql');
        console.log('🔄 Reading schema file...');

        const schema = fs.readFileSync(schemaPath, 'utf8');

        // Split the schema into individual statements (skip CREATE DATABASE and USE statements)
        const statements = schema
            .split(';')
            .map(stmt => stmt.trim())
            .filter(stmt =>
                stmt.length > 0 &&
                !stmt.toUpperCase().startsWith('CREATE DATABASE') &&
                !stmt.toUpperCase().startsWith('USE ')
            );

        console.log('🔄 Creating tables if they don\'t exist...');

        for (const statement of statements) {
            if (statement.trim()) {
                await connection.query(statement);
            }
        }

        console.log('✅ All tables created successfully');
        console.log('✅ Database initialization complete!\n');

        await connection.end();
        return true;

    } catch (error) {
        console.error('❌ Database initialization failed:', error.message);

        if (connection) {
            await connection.end();
        }

        // Don't throw the error, just return false
        // This allows the server to start even if DB connection fails
        return false;
    }
}

module.exports = initializeDatabase;
