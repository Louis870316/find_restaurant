const mongoose = require('mongoose')

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

module.exports = db