const express = require('express');
const salesController = require('../controllers/salesController');
const salesMiddlewares = require('../middlewares/salesMiddlewares');

const { validateProduct, validateQuantity } = salesMiddlewares;

const router = express.Router();

router.post('/',
  validateProduct,
  validateQuantity, salesController.add);

module.exports = router;
