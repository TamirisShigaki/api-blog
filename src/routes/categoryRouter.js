const router = require('express').Router();
const controller = require('../controllers/index');
const validateToken = require('../middlewares/auth/validateToken');

router.get('/', validateToken, controller.category.getAllCategory);
router.post('/', validateToken, controller.category.create);

module.exports = router;