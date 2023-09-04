

async function checkDelBilling(req, res, next) {
    const { id } = req.params;


    if (id) {
        if (isNaN(id) || id < 1) {
            return res.status(400).json("Insira um id válido");
        }
    }



    next();
}

module.exports = { checkDelBilling };
