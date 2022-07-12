const express = require('express');
const salesController = require('../controllers/salesController');
const salesMiddlewares = require('../middlewares/salesMiddlewares');

const { validateProduct, validateQuantity, validateSaleId } = salesMiddlewares;

const router = express.Router();

router.get('/', salesController.getAllSales);
router.get('/:id', validateSaleId, salesController.getSaleById);
router.post('/',
  validateProduct,
  validateQuantity, salesController.add);
router.delete('/:id', validateSaleId, salesController.exclude);
// router.put('/:id', validateProduct, validateQuantity, salesController.update);

module.exports = router;
