const { Router } = require("express")

const UserRequestsController = require("../controllers/UserRequestsController")

const userRequestsRoutes = Router()
const userRequests = new UserRequestsController()

userRequestsRoutes.post("/", userRequests.create)

module.exports = userRequestsRoutes
