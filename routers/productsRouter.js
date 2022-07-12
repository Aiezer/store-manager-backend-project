const express = require('express');
const productsController = require('../controllers/productsController');
const productMiddlewares = require('../middlewares/productMiddlewares');

const { validateProductName, validateId } = productMiddlewares;
const router = express.Router();

router.get('/', productsController.getAll);
router.get('/:id', productsController.getById);
router.post('/', validateProductName, productsController.add);
router.put('/:id', validateProductName, productsController.update);
router.delete('/:id', validateId, productsController.exclude);

module.exports = router;
