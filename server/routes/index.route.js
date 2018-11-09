const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

const userRoutes = require('./auth.route');

router.use('/user', userRoutes);

module.exports = router;
