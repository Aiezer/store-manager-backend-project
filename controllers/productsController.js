const productsService = require('../services/productsService');
const httpStatus = require('../helpers/httpStatusCode');

const operationError = 'Erro ao tentar realizar operação';

const getAll = async (req, res) => {
  try {
    const results = await productsService.getAll();
    if (!results) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: 'Product not found' });
    }
    res.status(httpStatus.OK).json(results);
  } catch (err) {
    console.error(err);
    res.status(httpStatus.INTERNAL_SERVER).json({ message: operationError });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await productsService.getById(id);
    if (!result || result.length < 1) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: 'Product not found' });
    }
    res.status(httpStatus.OK).json(result);
  } catch (err) {
    console.error(err);
    res
      .status(httpStatus.INTERNAL_SERVER)
      .send(operationError);
  }
};

const add = async (req, res) => {
  try {
    const { name } = req.body;
    const result = await productsService.add(name);

    if (!result) {
      return res.status(400).send('Dados inválidos');
    }
    res.status(httpStatus.CREATED).json(result);
  } catch (err) {
    console.error(err);
    res.status(httpStatus.INTERNAL_SERVER).send(operationError);
  }
};

const update = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const result = await productsService.update(id, name);

    if (result.length === 0) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: 'Product not found' });
    }
    return res
      .status(httpStatus.OK)
      .json({ id, name });
  } catch (err) {
    console.error(err);
    res.status(httpStatus.INTERNAL_SERVER).json({ message: operationError });
  }
};

const exclude = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productsService.exclude(id);

    if (result === null || result.length < 1) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: 'Product not found' });
    }
    return res
      .status(204)
      .end();
  } catch (err) {
    console.error(err);
    res.status(httpStatus.INTERNAL_SERVER).json({ message: operationError });
  }
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  exclude,
};
