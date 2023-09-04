const checkEditProfile = (req, res, next) => {
  const { id, name, email, cpf, phone } = req.body;

  if (!id || id % 1 !== 0 || isNaN(id)) {
    return res.status(400).json({mensagem: 'Insira um id válido'})
  }

  if (!name || !email) {
    return res
      .status(400)
      .json("Nome e e-mail são obrigatórios para atualização.");
  }

/*   if (cpf === "" || cpf === null) {
    return res
      .status(400)
      .json("Algum dado precisa ser informado no campo CPF para atualização");
  }

  if (phone === "" || phone === null) {
    return res
      .status(400)
      .json(
        "Algum dado precisa ser informado no campo Telefone para atualização"
      );
  } */

  next();
};

module.exports = { checkEditProfile };
