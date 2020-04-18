const bcrypt = require('bcrypt');

async function hashPass (pass) {
  const hash = await bcrypt.hash(pass, 10);
  try {
    return hash;
  } catch (error) {
    console.log(error);
  }
}

module.exports = hashPass;
