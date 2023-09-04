const { knex } = require('../../../database/connection');

async function sendCustomer( req, res ) {
    const today = new Date();
    const { id } = req.params;
    
    try {
        const customer = await knex('clients')
        .select(
            'id', 'name', 'email', 'cpf', 'phone', 'zip', 'address', 
            'complement', 'district', 'city', 'state')
        .where({id})
        .returning('*');

        const billing = await knex('billing')
        .select(
            'id', 'due_date', 'value',
            knex.raw(`
                CASE 
                    WHEN paid = false AND due_date < ? THEN 'Vencida' 
                    WHEN paid = false AND due_date >= ? THEN 'Pendente' 
                    ELSE 'Paga' 
                END as status
            `, [today, today]), 
            'description')
        .where({client_id: id})
        .returning('*');

        return res.status(200).json({customer, billing});
    } catch (error) {
        return res.status(400).json({error});
    }
}    


module.exports = { sendCustomer }