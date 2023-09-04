const { knex } = require('../../../database/connection');
const { encryptPassword } = require('../helpers/encryptPassword');

async function makeSignup( req, res ) {
    const { name, email, password } = req.body;
    
    try {
        const encryptedPassword = await encryptPassword(password);
        const user = await knex('users')
            .insert({ name, email, password: encryptedPassword })
            .returning('*');

        return res.status(200).json({
            user: {
                id: user[0].id,
                name: user[0].name,
                email: user[0].email
            }
        });
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
}

module.exports = { makeSignup }