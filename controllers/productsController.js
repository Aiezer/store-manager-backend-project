const productsService = require('../services/productsService');
const httpStatus = require('../helpers/httpStatusCode');

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
    res
      .status(httpStatus.INTERNAL_SERVER)
      .json({ message: 'Erro ao tentar realizar operação' });
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
      .send('Erro ao tentar realizar operação');
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
    res
      .status(httpStatus.INTERNAL_SERVER)
      .send('Erro ao tentar realizar operação');
  }
};

module.exports = {
  getAll,
  getById,
  add,
};
