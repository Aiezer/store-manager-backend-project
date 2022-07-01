const express = require('express');
const productsController = require('../controllers/productsController');
const validateProductName = require('../middlewares/validateProductName');

const router = express.Router();

router.get('/', productsController.getAll);
router.get('/:id', productsController.getById);
router.post('/', validateProductName, productsController.add);

module.exports = router;
