const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// 新增餐廳頁面
router.get("/new", (req, res) => {
  res.render("new")
})

// 新增餐廳
router.post('/', (req, res) => {
  Restaurant.create(req.body)
    .then(res.redirect('/'))
    .catch(error => console.log(error))
})

// 瀏覽特定餐廳
router.get('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(Restaurant => res.render('show', { Restaurant }))
    .catch(error => console.log(error))
})

// 編輯餐廳頁面
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(Restaurant => res.render('edit', { Restaurant }))
    .catch(error => console.log(error))
})

// 更新餐廳
router.put("/:id", (req, res) => {
  const { id } = req.params
  Restaurant.findByIdAndUpdate(id, req.body)
    //可依照專案發展方向自定編輯後的動作，這邊是導向到瀏覽特定餐廳頁面
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(err => console.log(err))
})

// 刪除餐廳
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router