const sql = require('mssql');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

/**
 * Initialize database connection and setup for SQL Server
 */
async function initializeDatabase() {
    const config = {
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        server: process.env.DB_SERVER || 'localhost',
        options: {
            encrypt: true,
            trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true',
        }
    };

    let pool;

    try {
        console.log('🔄 Connecting to SQL Server...');
        pool = await sql.connect(config);
        console.log('✅ Connected to SQL Server successfully');

        const dbName = process.env.DB_NAME || 'doctor_appointment_db';
        console.log(`🔄 Creating database '${dbName}' if it doesn't exist...`);

        // Check if database exists
        const dbCheck = await pool.request()
            .query(`IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = '${dbName}')
                    BEGIN
                        CREATE DATABASE [${dbName}]
                    END`);

        console.log(`✅ Database '${dbName}' is ready`);

        // Close master connection and connect to specific database
        await pool.close();

        config.database = dbName;
        pool = await sql.connect(config);

        // Read and execute schema.sql
        const schemaPath = path.join(__dirname, '..', 'schema.sql');
        console.log('🔄 Reading schema file...');

        let schema = fs.readFileSync(schemaPath, 'utf8');

        // Split the schema into individual statements
        // T-SQL uses GO as a batch separator, but for simple schemas we can split by semicolon
        // We also need to be careful with GO if it exists
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
                try {
                    await pool.request().query(statement);
                } catch (stmtError) {
                    console.error('⚠️ Warning executing statement:', statement.substring(0, 50) + '...', stmtError.message);
                }
            }
        }

        console.log('✅ All tables/constraints checked/created');
        console.log('✅ Database initialization complete!\n');

        await pool.close();
        return true;

    } catch (error) {
        console.error('❌ Database initialization failed:', error.message);

        if (pool) {
            await pool.close();
        }
        return false;
    }
}

module.exports = initializeDatabase;
