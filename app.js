const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const methodOverride = require("method-override")
const Restaurant = require('./models/restaurant')

const app = express()
const port = 3000

mongoose.connect("mongodb+srv://lsd:lsd870316@cluster0.9slox1g.mongodb.net/find-restaurant?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// 瀏覽全部餐廳
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(Restaurant => res.render('index', { Restaurant }))
    .catch(error => console.log(error))
})

// 新增餐廳頁面
app.get("/restaurants/new", (req, res) => {
  res.render("new")
})

// 新增餐廳
app.post('/restaurants', (req, res) => {
  Restaurant.create(req.body)
    .then(res.redirect('/'))
    .catch(error => console.log(error))
})

// 瀏覽特定餐廳
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(Restaurant => res.render('show', { Restaurant }))
    .catch(error => console.log(error))
})

// 編輯餐廳頁面
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(Restaurant => res.render('edit', { Restaurant }))
    .catch(error => console.log(error))
})

// 更新餐廳
app.post("/restaurants/:id/edit", (req, res) => {
  const { id } = req.params
  Restaurant.findByIdAndUpdate(id, req.body)
    //可依照專案發展方向自定編輯後的動作，這邊是導向到瀏覽特定餐廳頁面
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(err => console.log(err))
})

// 刪除餐廳
app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 搜尋特定餐廳
app.get('/search', (req, res) => {
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

app.listen(port, () => {
  console.log(`listen on http://localhost:${port}`)
})