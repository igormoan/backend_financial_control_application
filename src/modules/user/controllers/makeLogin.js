const { knex } = require('../../../database/connection');
const { generateToken } = require('../helpers/auth');
const { checkPassword } = require('../helpers/checkPassword');

async function makeLogin( req, res ) {
    const { email, password } = req.body;
    
    try {
        const user = await knex.select( 'id', 'name', 'email', 'password' )
        .from('users')
        .where('email', email)
        .returning('*');
        
        const validPassword = await checkPassword(password, user[0].password);
        if (!validPassword) return res.status(400).json({message: "E-mail ou senha incorretos."})
        
        const authorizedUser = {id: user[0].id, name: user[0].name, email: user[0].email};
        const token = await generateToken(authorizedUser);        

        return res.status(200).json({user: authorizedUser, token});
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
}

module.exports = { makeLogin }