const mongoose = require("mongoose");

const CharacterSchema = new mongoose.Schema({
  name: String,
  class: String,
  level: Number,
  xp: Number,
  xpToLevel: Number,
  maxhp: Number,
  hp: Number,
  description: String,
  background: String,
});

const ConversationSchema = new mongoose.Schema({
  nombre: String,
  ultimo_mensaje: String,
  id: String,
});

const NewUserSchema = new mongoose.Schema({
  name: String,
  world: {
    type: String,
    default: null,
  },
  character: {
    type: [CharacterSchema],
    default: null,
  },
  conversaciones: {
    type: [ConversationSchema],
    default: null,
  },
});

let NewUser;
try {
  NewUser = mongoose.model("accounts");
} catch (error) {
  NewUser = mongoose.model("accounts", NewUserSchema);
}

module.exports = NewUser;
