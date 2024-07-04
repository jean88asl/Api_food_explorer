const { Router } = require("express")

const usersRoutes = require("./users.routes")
const dishRoutes = require("./dish.routes")
const userRequestsRoutes = require("./userRequests.routes")
const sessionsRoutes = require("./sessions.routes")

const routes = Router()

routes.use("/users", usersRoutes)
routes.use("/sessions", sessionsRoutes)
routes.use("/dish", dishRoutes)
routes.use("/requests", userRequestsRoutes)

module.exports = routes