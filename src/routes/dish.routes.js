const { Router } = require("express")

const multer = require("multer")
const uploadConfig = require("../configs/upload")

const DishController = require("../controllers/DishController")
const DishImageController = require("../controllers/DishImageController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const dishRoutes = Router()
const upload = multer(uploadConfig.MULTER) 

const dishController = new DishController()
const dishImageController = new DishImageController()

dishRoutes.post("/", ensureAuthenticated, dishController.create)
dishRoutes.get("/", dishController.index)
dishRoutes.get("/:id", dishController.show)
dishRoutes.put("/:id", dishController.update)
dishRoutes.delete("/:id", dishController.delete)
dishRoutes.patch("/image/:dish_id", ensureAuthenticated, upload.single("image"), dishImageController.update)


module.exports = dishRoutes
