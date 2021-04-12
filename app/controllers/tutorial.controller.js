const db = require('../models')
const Tutorial = db.tutorials
const Op = db.Sequelize.Op

const getPagination = (page, size) => {
    const limit = size ? +size : 3
    const offset = page ? page * limit : 0

    return {
        limit,
        offset
    }
}

const getPagingData = (data, page, limit) => {
    const {
        count: totalItems,
        rows: tutorials
    } = data
    const currentPage = page ? +page : 0
    const totalPages = Math.ceil(totalItems / limit)

    return {
        totalItems,
        tutorials,
        totalPages,
        currentPage
    }
}

//Create and save a new tutorial
exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({
            message: "Content should not be empty",
            body: req.body
        })
        return
    }
    //Create a tuto
    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    }

    //Save tuto in DB
    Tutorial.create(tutorial)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Tutorial."
            })
        })
}

//Get all tutorials from DB
exports.findAll = (req, res) => {

    const {
        page,
        size,
        title
    } = req.query

    var condition = title ? {
        title: {
            [Op.like]: `%${title}%`
        }
    } : null

    const {
        limit,
        offset
    } = getPagination(page, size)

    Tutorial.findAndCountAll({
            where: condition,
            limit,
            offset
        })
        .then(data => {
            const response = getPagingData(data, page, limit)
            res.send(response)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials."
            })
        })
}

//Find single tuto by id
exports.findOne = (req, res) => {
    const id = req.params.id

    Tutorial.findByPk(id)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id = " + id
            })
        })
}

//Update a tuto by ID
exports.update = (req, res) => {
    const id = req.params.id

    Tutorial.update(req.body, {
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial updated successfully"
                })
            } else {
                res.send({
                    message: `Cannot update Tutorial with id = ${id}. Maybe Tutorial was not found or req.body is empty!`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating tutorial with id = " + id
            })
        })
}

//Delete a tuto by ID
exports.delete = (req, res) => {
    const id = req.params.id

    Tutorial.destroy({
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial deleted successfully"
                })
            } else {
                res.send({
                    message: `Cannot delete tutorial with id = ${id}. Maybe tutorial was not found`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete tutorial with id = " + id
            })
        })
}

//Delete all the tuto
exports.deleteAll = (req, res) => {
    Tutorial.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({
                message: `${nums} Tutorials were eleted successfully`
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all tutorials."
            })
        })
}

//Find all the tuto
exports.findAllPublished = (req, res) => {
    Tutorial.findAll({
            where: {
                published: true
            }
        })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials."
            })
        })
}