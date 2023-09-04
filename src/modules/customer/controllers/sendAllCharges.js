const { knex } = require('../../../database/connection');
const { startOfDay, parseISO } = require('date-fns');

async function sendAllCharges( req, res ) {
    const { client_id } = req.body;
    const today = startOfDay(new Date());

    try {

        if (client_id) {
            const customerCharges = await knex('billing')
            .join('clients', 'billing.client_id', '=', 'clients.id')
            .select('billing.id', 'billing.client_id', 'billing.value', 'billing.due_date',
            'billing.paid', 'billing.description', 'clients.name',
            knex.raw(`
            CASE
                WHEN billing.paid = true THEN 'Paga'
                WHEN billing.paid = false AND billing.due_date >= ? THEN 'Pendente'
                ELSE 'Vencida'
            END as status`, [today]
        ))
            .where({client_id});
    
            return res.status(200).json({customerCharges});

        } else {
            const allCharges = await knex('billing')
            .join('clients', 'billing.client_id', '=', 'clients.id')
            .select('billing.id', 'billing.client_id', 'billing.value', 'billing.due_date',
            'billing.paid', 'billing.description', 'clients.name',
            knex.raw(`
            CASE
                WHEN billing.paid = true THEN 'Paga'
                WHEN billing.paid = false AND billing.due_date >= ? THEN 'Pendente'
                ELSE 'Vencida'
            END as status`, [today]
        ));

            return res.status(200).json({allCharges});
        }

    } catch (error) {
        return res.status(400).json({error});
    }
}    


module.exports = { sendAllCharges };