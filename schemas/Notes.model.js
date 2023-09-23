const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  emoji: {
    type: String,
  },
  content: {
    type: String,
  },
  intrash: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const Note = mongoose.model("Note", NoteSchema, "notes");

module.exports = Note;
