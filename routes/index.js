const express = require('express');
const router = express.Router();
const userRoutes = require('./user')
const thoughtRoutes = require('./thoughts')
const reactionRoutes = require('./reactions')
router.use('/api/user', userRoutes);
router.use('/api/thoughts', thoughtRoutes);
router.use('/api/reactions', reactionRoutes);






module.exports = router;