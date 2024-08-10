const { Router } = require("express")

const LikesController = require("../controllers/LikesController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const likesRoutes = Router()
const likesController = new LikesController()

likesRoutes.post("/:dish_id", ensureAuthenticated, likesController.create)
likesRoutes.get("/:dish_id", ensureAuthenticated, likesController.show)
likesRoutes.get("/", ensureAuthenticated, likesController.index)
likesRoutes.delete("/:id", ensureAuthenticated, likesController.delete)

module.exports = likesRoutes