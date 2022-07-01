const httpStatusCode = require('../helpers/httpStatusCode');

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

module.exports = validateProductName;
