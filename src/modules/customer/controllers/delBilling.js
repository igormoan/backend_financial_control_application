const { knex } = require('../../../database/connection');
const { startOfDay } = require('date-fns');



async function delBilling(req, res) {
    const { id } = req.params;
    const today = startOfDay(new Date());


    try {

        const statusBilling = await knex('billing')
            .select('*', knex.raw(`
        CASE
            WHEN billing.paid = true THEN 'paga'
            WHEN billing.paid = false AND billing.due_date >= ? THEN 'Pendente'
            ELSE 'vencida'
        END as status`, [today]
            ))
            .where({ id });

        if (statusBilling[0].status !== 'Pendente') {
            return res.status(400).json({ mensagem: `Não é possível excluir uma cobrança ${statusBilling[0].status}` })
        }




    } catch (error) {
        return res.status(400).json({ error });
    }



    try {
        await knex('billing').del().where('id', id).returning('id');
        return res.status(200).json({ mensagem: 'Cobrança excuída com sucesso!' });
    } catch (error) {
        return res.status(400).json({ error });
    }
}



module.exports = { delBilling }