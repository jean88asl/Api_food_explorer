const AppError = require("../utils/App.Error")
const knex = require('../database/knex')

class DishController {
    async create(request, response) {
        const { name, category, price, description, ingredients } = request.body

        if (!name || !category || !price || !description) {
            throw new AppError("Os dados são obrigatórios")
        }

        const [dish_id] = await knex("dish").insert({
            name,
            category,
            price,
            description
        })

        const ingredientsList = ingredients.map(ingredient => {
            return {
                name: ingredient,
                dish_id
            }
        })

        await knex("ingredients").insert(ingredientsList)

        response.status(200).json("Prato adicionado com sucesso.")
    }

    async update(request, response) {
        const { id } = request.params
        const { name, category, price, description } = request.body

        Number(price)

        const dish = await knex("dish").where({ id }).first()

        if(!dish) {
            throw new AppError("prato não encontrado.")
        }

        dish.name = name ?? dish.name
        dish.category = category ?? dish.category
        dish.price = price ?? dish.price
        dish.description = description ?? dish.description

        const updateDish = {
            name: dish.name,
            category: dish.category,
            price: dish.price,
            description: dish.description
        }

        await knex("dish").where({ id }).update(updateDish)

        response.status(201).json("Dados atualizados com sucesso.")
    }
    // mostrar um registro especifico
    async show(request, response) {
        const { id } = request.params
        const dish = await knex("dish")
            .where({ id })
            .first()

        const ingredients = await knex("ingredients").where({ dish_id: id })

        response.status(200).json({
            dish,
            ingredients
        })
    }

    async delete(request, response) {
        const { id } = request.params

        await knex("dish").where({ id }).delete()

        response.status(200).json("Prato deletado com sucesso")
    }
    // mostrar todos os registros
    async index(request, response) {
        const dishes = await knex("dish").orderBy("name", 'asc')

        response.status(200).json(dishes)
    }
}

module.exports = DishController