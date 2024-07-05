const knex = require("../database/knex")
const AppError = require("../utils/App.Error")
const DiskStorage = require("../providers/DiskStorage")


class DishImageController {
    async update(request, response) {
        const { dish_id } = request.params
        const dishImage = request.file.filename

        const diskStorage = new DiskStorage()

        const dish = await knex("dish")
            .where({ id: dish_id }).first()

        if (dish.image_dish) {
            await diskStorage.deleteFile(dish.image_dish)
        }

        const filename = await diskStorage.saveFile(dishImage)
        dish.image_dish = filename

        await knex("dish").update(dish).where({ id: dish_id })

        return response.json(dish)
    }
}

module.exports = DishImageController