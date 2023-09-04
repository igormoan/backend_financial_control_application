const { boolean } = require("joi");

const checkEditBilling = (req, res, next) => {
  const { id } = req.params;
  const { description, paid, value, due_date } = req.body;

  if (!id || id % 1 !== 0 || isNaN(id)) {
    return res.status(400).json({ mensagem: "Insira um ID válido" });
  }

  if (!description) {
    return res.status(400).json({ mensagem: "Insira uma descrição válida" });
  }

  if (typeof paid !== "boolean") {
    return res
      .status(400)
      .json("As opções do campo 'PAID' são apenas 'true' e 'false'");
  }

  if (!value || value < 0 || isNaN(value)) {
    return res
      .status(400)
      .json({ mensagem: "Insira um valor em reais válido" });
  }

  if (!due_date) {
    return res.status(400).json("Preencha o vencimento");
  }

  next();
};

module.exports = { checkEditBilling };
