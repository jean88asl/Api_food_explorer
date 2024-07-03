const { Router } = require("express")

const DishController = require("../controllers/DishController")

const dishRoutes = Router()
const dishController = new DishController()

dishRoutes.post("/", dishController.create)
dishRoutes.get("/", dishController.index)
dishRoutes.get("/:id", dishController.show)
dishRoutes.put("/:id", dishController.update)
dishRoutes.delete("/:id", dishController.delete)

module.exports = dishRoutes
