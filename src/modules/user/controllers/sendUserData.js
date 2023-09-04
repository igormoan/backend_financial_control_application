const {checkToken} = require('../helpers/auth.js');
const { knex } = require('../../../database/connection');


async function sendUserData( req, res ) {
    const token = req.headers.authorization.split(' ')[1];
    
    try {
        const decoded = await checkToken(token);
        const user = await knex('users')
            .select('id', 'name', 'email', 'phone', 'cpf')
            .where('email', decoded.email)
            .returning('*').first();

        return res.json({user});
    }
    catch (error) {
        return res.status(400).json(error)
    }
}


module.exports = { sendUserData }