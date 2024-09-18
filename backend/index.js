const express = require("express")
const app = express()
const { createTodo, updateTodo } = require("./type")
const { todo } = require("./db")
const cors = require("cors")

app.use(express.json())
app.use(cors())

app.post("/todo", async function(req, res) {
    const listofitems = req.body 
    const parsepayLoad = createTodo.safeParse(listofitems)

    if (!parsepayLoad.success) {
        res.status(411).json({
            message: "Invalid Types"
        })
        return 
    }

    await todo.create({
        title: listofitems.title,
        description: listofitems.description,
        completed: false
    })

    res.json({
        message: "Todo created"
    })
})

app.get("/todos", async function(req, res) {
    const todos = await todo.find({})
    res.json({
        todos
    })
})

app.put("/completed", async function(req, res) {
    const listUpdate = req.body
    const parseUpdate = updateTodo.safeParse(listUpdate)

    if (!parseUpdate.success) {
        res.status(411).json({
            message: "Invalid Type"
        })
        return;
    }

    await todo.updateOne({
        _id: req.body.id
    }, {
        completed: true
    })

    res.json({
        message: "completed"
    })
})

app.listen(3000, (error) => {
    if (error) throw new Error(error)
    console.log(`Server listening on port ${3000}!`)
})