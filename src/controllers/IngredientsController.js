const AppError = require("../utils/App.Error")
const knex = require('../database/knex')

class IngredientsController {
    async show(request, response) {
        const { dish_id } = request.params

        const ingredients = await knex("ingredients")
            .where({ dish_id })
            .orderBy("name")

        response.status(200).json(ingredients)
    }

    async update(request, response) {
        const { dish_id } = request.params
        const { ingredients } = request.body

        await knex("ingredients").where({ dish_id }).delete()

        const ingredientsList = ingredients.map(ingredient => {
            return {
                name: ingredient,
                dish_id
            }
        })

        await knex("ingredients").insert(ingredientsList)
    }
}

module.exports = IngredientsController