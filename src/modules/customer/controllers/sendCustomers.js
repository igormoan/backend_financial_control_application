const { knex } = require('../../../database/connection');

async function sendCustomers( req, res ) {
    const today = new Date();
    
    try {
        const customers = await knex
        .select('clients.id', 'clients.name', 'clients.email', 'clients.cpf', 'clients.phone')
        .from('clients')
        .leftJoin('billing', 'clients.id', 'billing.client_id')
        .groupBy('clients.id', 'clients.name', 'clients.email', 'clients.cpf', 'clients.phone')
        .select(
            knex.raw(`
            MAX(
                CASE WHEN billing.paid = false AND billing.due_date < ? 
                    THEN 'Inadimplente' 
                    ELSE 'Em dia' 
                END
            ) as status
            `, [today]
            ))
        .returning('*');

        return res.status(200).json({customers});
    } catch (error) {
        return res.status(400).json({error});
    }
}    


module.exports = { sendCustomers };