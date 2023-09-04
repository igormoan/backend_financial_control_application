const { knex } = require('../../../database/connection');

async function editCustomer( req, res ) {
    const { id, name, email, cpf, phone, zip, address, complement, district, city, state } = req.body;
    const update = {};

    if(name) update.name = name;
    if(email) update.email = email;
    if(cpf) update.cpf = cpf;
    if(phone) update.phone = phone;
    if(zip) update.zip = zip;
    if(address) update.address = address;
    if(complement) update.complement = complement;
    if(district) update.district = district;
    if(city) update.city = city;
    if(state) update.state = state;

    try {
        await knex('clients').where({id}).update(update);
        return res.status(200).json({mensagem: 'Cliente atualizado com sucesso!'});
    } catch (error) {
        return res.status(400).json({error});
    }
}    


module.exports = { editCustomer }