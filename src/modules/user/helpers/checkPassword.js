const bcrypt = require('bcrypt');

async function checkPassword(password, encryptedPassword) {
    const validPassword = await bcrypt.compare(password, encryptedPassword);
    return validPassword;
}

module.exports = {
    checkPassword
}
