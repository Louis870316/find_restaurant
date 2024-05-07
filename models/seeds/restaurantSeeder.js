const mongoose = require("mongoose")
const Restaurant = require("../restaurant")
const restaurantList = require("../../restaurant.json").results

mongoose.connect("mongodb+srv://lsd:lsd870316@cluster0.9slox1g.mongodb.net/find-restaurant?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection

db.on("error", () => {
  console.log("mongodb error!")
})

db.once("open", () => {
  console.log("running restaurantSeeder script...")

  Restaurant.create(restaurantList)
    .then(() => {
      console.log("restaurantSeeder done!")
      db.close()
    })
    .catch(err => console.log(err))
})