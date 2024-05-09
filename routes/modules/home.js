const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(Restaurant => res.render('index', { Restaurant }))
    .catch(error => console.log(error))
})

// 搜尋特定餐廳
router.get('/search', (req, res) => {
  if (!req.query.keyword) {
    return res.redirect("/")
  }
  const keywords = req.query.keyword
  const keyword = req.query.keyword.trim().toLowerCase()
  Restaurant.find({})
    .lean()
    .then(Restaurant => {
      const filterRestaurantsData = Restaurant.filter(data => data.name.toLowerCase().includes(keyword) || data.category.includes(keyword))
      res.render('index', { Restaurant: filterRestaurantsData, keywords })
    })
    .catch(err => console.log(err))
})

module.exports = router