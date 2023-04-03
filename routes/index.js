const express = require('express');
const router = express.Router();
const userRoutes = require('./user')
const thoughtRoutes = require('./thoughts')
const reactionRoutes = require('./reactions')
router.use('/user', userRoutes);
router.use('/thoughts', thoughtRoutes);
router.use('/reactions', reactionRoutes);






module.exports = router;