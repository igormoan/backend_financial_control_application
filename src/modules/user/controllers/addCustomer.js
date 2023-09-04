const { knex } = require('../../../database/connection');

async function addCustomer(req, res) {
    const { user_id, name, email, cpf, phone, zip, address, complement, district, city, state }
        = req.body;

    const newClient = {
        user_id,
        name,
        email,
        cpf,
        phone,
        zip,
        address,
        complement,
        district,
        city,
        state,

    }
    try {
        await knex('clients').insert(newClient).returning('*');
        return res.json({
            mensagem:
                "Cadastro efetuado com sucesso!"
        });
    }
    catch (error) {
        return res.status(400).json(error)
    }
}

module.exports = { addCustomer };

