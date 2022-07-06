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

const getAllSales = async (req, res) => {
  try {
    const results = await salesService.getAllSales();
    if (!results) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: 'Product not found' });
    }
    res.status(httpStatus.OK).json(results);
  } catch (err) {
    console.error(err);
    res
      .status(httpStatus.INTERNAL_SERVER)
      .json({ message: 'Erro ao tentar realizar operação' });
  }
};

const getSaleById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await salesService.getSaleById(id);
    if (!result || result.length < 1) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: 'Sale not found' });
    }
    res.status(httpStatus.OK).json(result);
  } catch (err) {
    console.error(err);
    res
      .status(httpStatus.INTERNAL_SERVER)
      .send('Erro ao tentar realizar operação');
  }
};

module.exports = {
  add,
  getAllSales,
  getSaleById,
};
