
const OK = 200;
const BAD_REQUEST = 400;

const checkRegisterCustomer = (req, res, next) => {
    const { name, email, cpf, phone } = req.body;

    if (!name) {
        return res
            .status(BAD_REQUEST)
            .json({ messagem: "O nome deve ser informado" });
    }

    if (!email) {
        return res
            .status(BAD_REQUEST)
            .json({ messagem: "O email deve ser informado" });
    }

    if (!cpf) {
        return res
            .status(BAD_REQUEST)
            .json({ messagem: "O CPF deve ser informado" });
    }

    if (!phone) {
        return res
            .status(BAD_REQUEST)
            .json({ messagem: "O telefone deve ser informado" });
    }

    next();
}

module.exports = { checkRegisterCustomer }