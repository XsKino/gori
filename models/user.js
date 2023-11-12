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

const NewUserSchema = new mongoose.Schema({
  name: String,
  world: {
    type: String,
    default: null
  },
  character: {
    type: [CharacterSchema],
    default: null
  }
})

let NewUser
try {
  NewUser = mongoose.model('newAccounts')
} catch (error) {
  NewUser = mongoose.model('newAccounts', NewUserSchema)
}

module.exports = NewUser
