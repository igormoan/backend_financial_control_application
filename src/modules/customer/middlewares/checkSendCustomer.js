const checkSendCustomer = (req, res, next) => {
    const { id } = req.params;

    if (!id || isNaN(+id) || +id < 1 || +id % 1 !== 0) {
        return res.status(400).json("Insira um id válido");
    }

    next();
  };
  
  module.exports = { checkSendCustomer };