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

    async update(request, response) {
        const { dish_id } = request.params
        const user_id = request.user.id

        await knex('likes').insert({
            dish_id,
            user_id,
            liked: true,
        })

        response.status(200).json("update like.")
    }
}

module.exports = LikesController