const router = require('express').Router();
const controller = require('../controllers/index');

router.post('/', controller.user.create);

module.exports = router;