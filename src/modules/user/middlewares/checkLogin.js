const checkLogin = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ mensagem: 'email e senha são obrigatórios' })
    }

    next();
}

module.exports = { checkLogin }