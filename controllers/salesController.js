const salesService = require('../services/salesService');
const httpStatus = require('../helpers/httpStatusCode');

const operationError = 'Erro ao tentar realizar operação';

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
      .send(operationError);
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
      .json({ message: operationError });
  }
};

const getSaleById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await salesService.getSaleById(id);
    if (!result) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: 'Sale not found' });
    }
    res.status(httpStatus.OK).json(result);
  } catch (err) {
    console.error(err);
    res
      .status(httpStatus.INTERNAL_SERVER)
      .send(operationError);
  }
};

const exclude = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await salesService.exclude(id);

    if (result === false) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: 'Sale not found' });
    }
    return res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(httpStatus.INTERNAL_SERVER).json({ message: operationError });
  }
};

const update = async (req, res) => {
  try {
    const itemsUpdated = req.body;
    const { id } = req.params;

    await salesService.updateSaleById(id, itemsUpdated);

    return res.status(httpStatus.OK).json({ saleId: id, itemsUpdated });
  } catch (err) {
    console.error(err);
    res.status(httpStatus.INTERNAL_SERVER).json({ message: operationError });
  }
};

module.exports = {
  add,
  getAllSales,
  getSaleById,
  exclude,
  update,
};
