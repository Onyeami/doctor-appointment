const sql = require('mssql');
const dotenv = require('dotenv');

dotenv.config();

const config = {
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  server: process.env.DB_SERVER || 'localhost',
  database: process.env.DB_NAME || 'doctor_appointment_db',
  options: {
    encrypt: true, // For Azure
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true',
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('✅ Connected to SQL Server');
    return pool;
  })
  .catch(err => {
    console.error('❌ SQL Server Connection Failed:', err);
    process.exit(1);
  });

// Wrapper to maintain compatibility with db.execute() pattern (MySQL-style)
const db = {
  execute: async (query, params = []) => {
    const pool = await poolPromise;
    const request = pool.request();

    // Convert ? placeholders to @p0, @p1, etc. for SQL Server
    let i = 0;
    const transformedQuery = query.replace(/\?/g, () => {
      const paramName = `p${i}`;
      request.input(paramName, params[i]);
      i++;
      return `@${paramName}`;
    });

    const result = await request.query(transformedQuery);

    // Return format matching mysql2: [rows, fields]
    // Note: SQL Server returns rows in result.recordset
    // We also handle result.insertId for INSERT statements
    const rows = result.recordset || [];

    // Add insertId if it's an INSERT statement (using SCOPE_IDENTITY logic)
    // In our controllers, we'll append "SELECT SCOPE_IDENTITY() AS insertId" to inserts if needed,
    // or use OUTPUT INSERTED.id.
    const resultProxy = {
      ...result,
      insertId: result.recordset && result.recordset[0] && (result.recordset[0].insertId || result.recordset[0].id)
    };

    return [rows, resultProxy];
  }
};

module.exports = db;
