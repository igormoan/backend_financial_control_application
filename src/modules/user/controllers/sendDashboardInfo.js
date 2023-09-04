const {knex} = require("../../../database/connection");

const sendDashboardInfo = async (req, res) => {
  const today = new Date();

  try {
    const customers = await knex 
    .select('clients.id', 'clients.name', 'clients.email', 'clients.cpf', 'clients.phone')
    .from('clients')
    .leftJoin('billing', 'clients.id', 'billing.client_id')
    .groupBy('clients.id')
    .select(
    knex.raw(`CASE 
      WHEN bool_or(billing.client_id IS NULL) OR bool_and(billing.paid OR billing.due_date > now()) THEN 'Em dia' 
      ELSE 'Inadimplente' 
    END as status`));

    const billing = await knex('billing')
      .select('billing.id', 'billing.due_date', 'billing.value', 'clients.name',
        knex.raw(`
          CASE 
            WHEN paid = false AND due_date < ? THEN 'Vencida'
            WHEN paid = false AND due_date >= ? THEN 'Pendente'
            ELSE 'Paga'
          END as status`, [today, today]
        )
      )
      .leftJoin('clients', 'clients.id', 'billing.client_id')
      .orderBy('billing.due_date', 'desc');


    const sums = await knex('billing')
    .select(
      knex.raw(`SUM(CASE WHEN paid = false AND due_date < ? THEN value ELSE 0 END) as late`, [today]),
      knex.raw(`SUM(CASE WHEN paid = false AND due_date >= ? THEN value ELSE 0 END) as payable`, [today]),
      knex.raw(`SUM(CASE WHEN paid = true THEN value ELSE 0 END) as paid`))
    .first();
    
    return res.status(200).json({ customers, billing, sums });
  } catch (error) {
    res.status(404).json(error.message);
  }

};

module.exports = {
  sendDashboardInfo,
};
