const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://guntreddyhemanth:fOcmSweNnla63P7L@cluster0.ktcij.mongodb.net/Todo")


const todoSchema = mongoose.Schema({
    title:String,
    description: String,
    completed: Boolean
})


const todo = mongoose.model('todo', todoSchema);

module.exports = {
    todo
}
