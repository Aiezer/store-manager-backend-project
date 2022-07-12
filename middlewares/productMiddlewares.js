const httpStatusCode = require('../helpers/httpStatusCode');
const productsModel = require('../models/productsModel');

const validateProductName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(httpStatusCode.BAD_REQUEST)
      .json({ message: '"name" is required' });
  }
  if (name.length < 5) {
    return res
      .status(422)
      .json({ message: '"name" length must be at least 5 characters long' });
  }
  next();
};

const validateId = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res
      .status(httpStatusCode.BAD_REQUEST)
      .json({ message: '"id" is required' });
  }
  const allProducts = await productsModel.getAll();
  if (!allProducts.some((product) => product.id === Number(id))) {
    return res
      .status(httpStatusCode.NOT_FOUND)
      .json({ message: 'Product not found' });
  }
  next();
};

module.exports = { validateProductName, validateId };
