const express = require('express');
const chargeConroller = require('../controllers/chargeController');

const router = express.Router();

router.get('/:count', chargeConroller.build);
router.get('/', chargeConroller.fetch);

module.exports = router;
