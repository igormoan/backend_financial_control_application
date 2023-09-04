const { startOfDay, parseISO } = require('date-fns');
const { knex } = require('../../../database/connection');

async function addCharge( req, res ) {
    const { client_id, value, due_date, paid, description } = req.body;
    const formattedDueDate = startOfDay(parseISO(due_date, 'yyyy-MM-dd', new Date()));

    const newCharge = { client_id, value, due_date: formattedDueDate, paid, description };

    try {
        await knex('billing').insert(newCharge);
        return res.status(200).json({mensagem: 'Cobrança adicionada com sucesso!'});
    } catch (error) {
        return res.status(400).json({error});
    }
}    


module.exports = { addCharge };