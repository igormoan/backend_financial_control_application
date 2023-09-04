const { parseISO, isBefore, startOfDay, isValid } = require('date-fns');

const checkAddCharge = (req, res, next) => {
    const { client_id, value, due_date, paid, description } = req.body;
    const today = startOfDay(new Date());
    const due_date_obj = startOfDay(parseISO(due_date, 'yyyy-MM-dd', new Date()));
  
    if (!client_id) {
      return res.status(400).json({mensagem: 'Insira um id de cliente válido'});
    }

    if (!value || value <= 0) {
        return res.status(400).json({mensagem: 'Insira um valor válido'});
    }
  
    if (!isValid(due_date_obj)) {
      return res.status(400).json({mensagem: 'Insira uma data válida'});
    }
  
    if (typeof(paid) !== 'boolean') {
      return res.status(400).json({mensagem: 'É necessário informar o status (pago/pendente) da cobrança'});
    }

    if (!description) {
        return res.status(400).json({mensagem: 'É necessário informar a descrição da cobrança'})
    }

    if ( isBefore(due_date_obj, today) && paid === false) {
        return res.status(400).json({mensagem: 'Não é possível adicionar uma cobrança pendente no passado'})
    }
  
    next();
  };
  
  module.exports = { checkAddCharge };