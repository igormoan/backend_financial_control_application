const jwt = require('jsonwebtoken');


async function generateToken(user) {
    const token = await jwt.sign(user, process.env.JWT_KEY, {expiresIn: '8h'});
    return token;
}

async function checkToken(token) {
    const validToken = jwt.verify(token, process.env.JWT_KEY);
    return validToken;
}

module.exports = {
    generateToken,
    checkToken
}