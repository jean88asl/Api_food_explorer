const knex = require("../database/knex")

class LikesController {
    async create(request, response) {
        const { dish_id } = request.params
        const user_id = request.user.id

        const existingRating = await knex("likes")
            .where({ dish_id, user_id })
            .first()

        if (existingRating) {
            return response.status(401).json('Você já curtiu esse prato')
        }

        await knex('likes').insert({
            dish_id,
            user_id,
            liked: true,
        })

        response.status(201).json('Curtida aplicada com sucesso.')
    }

    async show(request, response) {
        const { dish_id } = request.params
        const user_id = request.user.id

        const dataLike = await knex("likes")
            .where({ dish_id, user_id })
            .first()

        response.status(200).json(dataLike)
    }

    async index(request, response) {
        const user_id = request.user.id
        const favorites = await knex("likes as l")
            .select("d.name", "d.image_dish", "l.dish_id", "l.id as id_favorites")
            .innerJoin("dish as d", "d.id", "l.dish_id")
            .where({user_id})
            .orderBy("d.name")

        response.status(200).json(favorites)    
    }

    async delete(request, response) {
        const { id } = request.params
        const user_id = request.user.id

        await knex('likes')
            .delete()
            .where({id, user_id})

        response.status(200).json("liked removed")
    }
}

module.exports = LikesController