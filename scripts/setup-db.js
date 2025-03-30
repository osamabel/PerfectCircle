const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function setupDatabase() {
  try {
    console.log('Starting database setup...');
    
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
  } finally {
    await pool.end();
  }
}

setupDatabase();