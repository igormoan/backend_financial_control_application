const checkEditCustomer = (req, res, next) => {
    const { name, email, cpf, phone } = req.body;
  
    if (!name || name.length < 3) {
      return res.status(400).json("Insira um nome válido");
    }

    if (!email || email.length < 7) {
        return res.status(400).json("O e-mail é obrigatório");
    }
  
    if (!cpf || cpf.toString().length < 11 || cpf === null) {
      return res.status(400).json("CPF inválido");
    }
  
    if (!phone || phone.toString().length < 7 || phone === null) {
      return res.status(400).json("O telefone é obrigatório");
    }
  
    next();
  };
  
  module.exports = { checkEditCustomer };