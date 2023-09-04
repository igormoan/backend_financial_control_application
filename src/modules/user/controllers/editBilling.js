const { knex } = require("../../../database/connection");

async function editBilling(req, res) {
  const { value, due_date, paid, description } = req.body;
  const { id } = req.params;
  const dataToBeUpdate = {};

  try {
    const existingBilling = await knex("billing").where({ id }).first();

    if (!existingBilling) {
      return res.status(404).json("Cobrança não encontrada.");
    }

    if (description) {
      dataToBeUpdate.description = description;
    }

    if (value) {
      dataToBeUpdate.value = value;
    }

    if (due_date) {
      dataToBeUpdate.due_date = due_date;
    }

    dataToBeUpdate.paid = paid;

    await knex("billing").where({ id }).update(dataToBeUpdate);

    return res.status(200).json("Cobrança atualizada com sucesso!");
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

module.exports = {
  editBilling,
};
