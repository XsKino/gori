const mongoose = require('mongoose')

const CharacterSchema = new mongoose.Schema({
  name: String,
  class: String,
  level: Number,
  xp: Number,
  xpToLevel: Number,
  maxhp: Number,
  hp: Number,
  description: String,
  background: String
})

const UserSchema = new mongoose.Schema({
  name: String,
  world: {
    type: String,
    default: ''
  },
  character: [CharacterSchema]
})

let User
try {
  User = mongoose.model('accounts')
} catch (error) {
  User = mongoose.model('accounts', UserSchema)
}

module.exports = User
