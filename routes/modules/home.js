const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(Restaurant => res.render('index', { Restaurant }))
    .catch(error => console.log(error))
})

module.exports = router