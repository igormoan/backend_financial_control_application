const { checkToken } = require('../helpers/auth');

async function checkAuth( req, res, next ) {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json('Não autorizado');

    try {
        const token = authorization.replace('Bearer ', '').trim();
        await checkToken(token);
    } catch (error) {
        return res.status(401).json({error: error.message})
    }

    next();
}


module.exports = { checkAuth };