const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const restaurant = require('./modules/restaurant')
const search = require('./modules/search')

router.use('/', home)
router.use('/restaurants', restaurant)
router.use('/', search)

module.exports = router