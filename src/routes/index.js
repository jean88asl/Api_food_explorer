const { Router } = require("express")

const usersRoutes = require("./users.routes")
const dishRoutes = require("./dish.routes")
const userRequests = require("./userRequests.routes")

const routes = Router()

routes.use("/users", usersRoutes)
routes.use("/dish", dishRoutes)
routes.use("/requests", userRequests)

module.exports = routes