const salesService = require('../services/salesService');
const httpStatus = require('../helpers/httpStatusCode');

const add = async (req, res) => {
  try {
    const sales = req.body;
    const result = await salesService.add(sales);

    if (!result) {
      return res.status(400).send('Dados inválidos');
    }
    res.status(httpStatus.CREATED).json(result);
  } catch (err) {
    console.error(err);
    res
      .status(httpStatus.INTERNAL_SERVER)
      .send('Erro ao tentar realizar operação');
  }
};

module.exports = {
  add,
};
