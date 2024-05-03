const express = require('express')
const mongoose = require('mongoose')

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
/* if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
} */

const app = express()
const port = 3000

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

const exphbs = require('express-handlebars')
const restaurantsData = require('./restaurant.json').results

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/', (req, res) => {

  res.render('index', { restaurantsData })
})

app.get('/search', (req, res) => {
  if (!req.query.keyword) {
    return res.redirect("/")
  }
  const keywords = req.query.keyword
  const keyword = req.query.keyword.trim().toLowerCase()
  const filterRestaurantsData = restaurantsData.filter(data => data.name.toLowerCase().includes(keyword) || data.category.includes(keyword))
  res.render('index', { restaurantsData: filterRestaurantsData, keywords })
})

app.get('/restaurants/:id', (req, res) => {
  const restaurantId = req.params.id
  const restaurant = restaurantsData.find(data =>
    data.id === Number(restaurantId)
  )
  res.render('show', { restaurant })
})

app.get('/', (req, res) => {

})

app.listen(port, () => {
  console.log(`listen on http://localhost:${port}`)
})