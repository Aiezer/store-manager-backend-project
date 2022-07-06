const express = require('express');
const salesController = require('../controllers/salesController');
const salesMiddlewares = require('../middlewares/salesMiddlewares');

const { validateProduct, validateQuantity } = salesMiddlewares;

const router = express.Router();

router.get('/', salesController.getAllSales);
router.get('/:id', salesController.getSaleById);
router.post('/',
  validateProduct,
  validateQuantity, salesController.add);

module.exports = router;
