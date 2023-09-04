const checkSendCustomers = (req, res, next) => {
/*     const { currentPage } = req.params;

    if (!currentPage || isNaN(currentPage) || currentPage < 1 || currentPage % 1 !== 0) {
        return res.status(400).json("Insira uma página válida");
    } */

    next();
  };
  
  module.exports = { checkSendCustomers };