const bcrypt = require('bcryptjs');

async function generateHash() {
  const password = 'q2I$0yw643]';
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  console.log('Password: q2I$0yw643]');
  console.log('Generated hash:', hash);
}

generateHash();