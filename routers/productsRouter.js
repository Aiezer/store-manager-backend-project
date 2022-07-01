const express = require('express');
const productsController = require('../controllers/productsController');
// const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', productsController.getAll);
router.get('/:id', productsController.getById);
router.post('/', productsController.add);

module.exports = router;
