const mongoose = require('mongoose')

const CharacterSchema = new mongoose.Schema({
  name: String,
  class: String,
  level: Number,
  hp: Number,
  description: String,
  background: String
})

const WorldSchema = new mongoose.Schema({
  world: String
})

const UserSchema = new mongoose.Schema({
  name: String,
  worlds: [WorldSchema],
  character: [CharacterSchema]
})

let User
try {
  User = mongoose.model('accounts')
} catch (error) {
  User = mongoose.model('accounts', UserSchema)
}

module.exports = User
