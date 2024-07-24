const { Router } = require("express")

const multer = require("multer")
const uploadConfig = require("../configs/upload")

const DishController = require("../controllers/DishController")
const DishImageController = require("../controllers/DishImageController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const checkUserAuthorization = require("../middlewares/checkUserAuthorization")

const dishRoutes = Router()
const upload = multer(uploadConfig.MULTER) 

const dishController = new DishController()
const dishImageController = new DishImageController()

// rotas admin
dishRoutes.post("/", ensureAuthenticated, checkUserAuthorization(["admin"]), dishController.create)
dishRoutes.patch("/image/:dish_id", ensureAuthenticated, checkUserAuthorization(["admin"]),upload.single("image"), dishImageController.update)
dishRoutes.put("/:id", checkUserAuthorization(["admin"]), dishController.update)

// rotas de usuário
dishRoutes.get("/", dishController.index)
dishRoutes.get("/:id", dishController.show)
dishRoutes.delete("/:id", dishController.delete)


module.exports = dishRoutes
