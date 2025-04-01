const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config();

// Parse connection URL to determine if it's internal or external
const isInternalConnection = process.env.DATABASE_URL.includes('x0sc0oo84o4088wwgg80gogg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Disable SSL for internal connections
  ssl: isInternalConnection ? false : (process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false)
});

async function setupDatabase() {
  try {
    console.log('Starting database setup...');
    console.log(`Using ${isInternalConnection ? 'internal' : 'external'} database connection`);
    
    // Read schema SQL file
    const schemaSQL = fs.readFileSync(path.join(__dirname, '../schema.sql'), 'utf8');
    
    console.log('Creating database schema...');
    await pool.query(schemaSQL);
    console.log('Schema created successfully.');
    
    // Read seed SQL file
    const seedSQL = fs.readFileSync(path.join(__dirname, '../seed.sql'), 'utf8');
    
    console.log('Seeding database...');
    await pool.query(seedSQL);
    console.log('Database seeded successfully.');
    
    console.log('Database setup completed.');
  } catch (error) {
    console.error('Error setting up database:', error);
    // Don't exit with error code 1 in production as it would stop the deployment
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
  } finally {
    await pool.end();
  }
}

setupDatabase();