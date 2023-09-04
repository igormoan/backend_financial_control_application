const bcrypt = require('bcrypt');

async function encryptPassword(password) {
    const encryptedPassword = await bcrypt.hash(password, +process.env.BCRYPT_SALT);
    return encryptedPassword;
}

module.exports = {
    encryptPassword
}