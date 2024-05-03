const express = require('express')
const app = express()
const port = 3000

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