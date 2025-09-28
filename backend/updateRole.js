const mysql = require('mysql2/promise');
require('dotenv').config();

async function updateUserRole() {
  const db = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
  });

  try {
    console.log('🔄 Updating user role...');
    await db.execute('UPDATE users SET role = ? WHERE email = ?', ['store_owner', 'vahorarizwan27@gmail.com']);
    console.log('✅ User role updated to store_owner');

    // Verify the update
    const [rows] = await db.execute('SELECT id, name, email, role FROM users WHERE email = ?', ['vahorarizwan27@gmail.com']);
    if (rows.length > 0) {
      console.log('✅ Updated user:', rows[0]);
    } else {
      console.log('❌ User not found');
    }
  } catch (err) {
    console.error('❌ Error updating user:', err.message);
  } finally {
    db.end();
  }
}

updateUserRole();
