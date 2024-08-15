const knex = require('../database/knex')
const moment = require("moment-timezone")

class UserRequestsController {
    async create(request, response) {
        const { list_items, type, total } = request.body;
        const user_id = request.user.id;

        const currentTime = moment().tz("America/Sao_Paulo").format();

        const data = {
            payment_type: type,
            total_requests: total,
            user_id,
            created_at: currentTime,
            updated_at: currentTime
        };

        const [id] = await knex("user_requests").insert(data);

        const list_dish = list_items.map(item => {
            return {
                dish_id: item.dish_id,
                dish_name: item.dish_name,
                quantity: item.quantity,
                request_id: id,
                id_user: user_id,
                created_at: currentTime,
                updated_at: currentTime
            }
        })

        await knex("request_items").insert(list_dish)

        return response.status(201).json({
            message: "Pedido realizado com sucesso",
            id,
        })
    }

    async index(request, response) {
        const user_id = request.user.id;

        // const dataRequests = await knex("request_items as ri")
        //     .select(
        //         "ur.id",
        //         "ri.dish_name",
        //         "ri.quantity",
        //         "ur.updated_at")
        //     .innerJoin("user_requests as ur", "ur.id", "ri.request_id")
        //     .where({ user_id })
        //     .orderBy("ur.updated_at", 'desc')

        const dataRequests = await knex("user_requests").where({ user_id }).orderBy("updated_at", 'desc')
        const dataItems = await knex("request_items").where({id_user: user_id})

        const requestWithItems = dataRequests.map(data => {
            const itemsOfRequest = dataItems.filter(item => item.request_id === data.id) 

            return {
                ...data,
                items: itemsOfRequest
            }
        })

        response.status(200).json(requestWithItems)
    }
}

module.exports = UserRequestsController