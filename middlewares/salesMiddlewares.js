const httpStatusCode = require('../helpers/httpStatusCode');
const productsModel = require('../models/productsModel');

const validateProduct = async (req, res, next) => {
  const products = req.body;

  if (products.some(({ productId }) => productId === undefined)) {
    return res
      .status(httpStatusCode.BAD_REQUEST)
      .json({ message: '"productId" is required' });
  }

  const allProducts = await productsModel.getAll();
  const allProductIds = allProducts.map(({ id }) => id);

  if (
    products.some(({ productId }) =>
      allProductIds.every((id) => productId !== id))
  ) {
    return res.status(httpStatusCode.NOT_FOUND).json({ message: 'Product not found' });
  }

  next();
};

const validateQuantity = (req, res, next) => {
  const products = req.body;

  if (products.some(({ quantity }) => quantity === undefined)) {
    return res
      .status(httpStatusCode.BAD_REQUEST)
      .json({ message: '"quantity" is required' });
  }

  if (products.some(({ quantity }) => quantity <= 0)) {
    return res
      .status(422)
      .json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

module.exports = {
  validateProduct,
  validateQuantity,
};
