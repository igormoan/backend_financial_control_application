const { knex } = require("../../../database/connection");
const bcrypt = require("bcrypt");

async function editProfile(req, res) {
  const { id, name, email, password, cpf, phone } = req.body;
  const dataToBeUpdate = {};

  try {
    const existingUser = await knex("users").where({ id }).first();

    if (!existingUser) {
      return res.status(404).json("Usuário não encontrado.");
    }

    if (name) {
      dataToBeUpdate.name = name;
    }

    if (email) {
      if (email !== existingUser.email) {
        const existingEmail = await knex("users").where({ email }).first();
        if (existingEmail) {
          return res.status(400).json("O email informado já está cadastrado.");
        }

        dataToBeUpdate.email = email;
      }
    }
    if (password) {
      if (password.length < 8) {
        return res.status(400).json({mensagem: 'A nova senha precisa ter no mínimo 8 caracteres'})
      }
      dataToBeUpdate.password = await bcrypt.hash(password, +process.env.BCRYPT_SALT);
    }

    if (cpf) {
      if (cpf !== existingUser.cpf) {
        const existingCpf = await knex("users").where({ cpf }).first();
        if (existingCpf) {
          return res.status(400).json("O cpf informado já está cadastrado.");
        }
        dataToBeUpdate.cpf = cpf;
      }
    }

    if (phone) {
      dataToBeUpdate.phone = phone;
    }

    await knex("users").where({ id }).update(dataToBeUpdate);

    return res.status(200).json("Usuário atualizado com sucesso!");
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

module.exports = {
  editProfile,
};
