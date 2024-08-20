const { Router } = require("express")

const UserRequestsController = require("../controllers/UserRequestsController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const userRequestsRoutes = Router()
const userRequests = new UserRequestsController()

userRequestsRoutes.post("/", ensureAuthenticated, userRequests.create)
userRequestsRoutes.get("/", ensureAuthenticated, userRequests.index)
userRequestsRoutes.put("/", ensureAuthenticated, userRequests.update)

module.exports = userRequestsRoutes
