
const OK = 200;
const NO_CONTENT = 201;
const NOT_FOUND = 404;
const BAD_REQUEST = 400;

const checkSignup = (req, res, next) => {
    const { name, email, password } = req.body;

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

    if (!password) {
        return res
            .status(BAD_REQUEST)
            .json({ messagem: "A senha deve ser informada" });
    }


    next();
}

module.exports = { checkSignup }