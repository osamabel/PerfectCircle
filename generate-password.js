const bcrypt = require('bcryptjs');

async function generateHash() {
  const password = 'Admin123!';
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  console.log('Password: Admin123!');
  console.log('Generated hash:', hash);
}

generateHash();