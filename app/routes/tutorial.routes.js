module.exports = app => {
    const tutorials = require('../controllers/tutorial.controller')

    var router = require("express").Router()

    //Create a new tutorial
    router.post("/", tutorials.create)

    //Retrieve all tuto
    router.get("/", tutorials.findAll)

    //Retrieve all published tuto
    router.get("/published", tutorials.findAllPublished)

    //Retrieve single tuto by ID
    router.get("/:id", tutorials.findOne)

    //Update tuto with ID
    router.put('/:id', tutorials.update)

    //Delete tuto by ID
    router.delete("/:id", tutorials.delete)

    //Delete all tuto
    router.delete("/", tutorials.deleteAll)

    app.use('/api/tutorials', router)
}