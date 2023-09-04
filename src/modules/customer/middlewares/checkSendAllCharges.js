const checkSendAllCharges = (req, res, next) => {
    const { client_id } = req.body;

    if (client_id) {
        if (isNaN(client_id) || client_id < 1) {
            return res.status(400).json("Insira um id válido");
          }
    }
  
    next();
  };
  
  module.exports = { checkSendAllCharges };