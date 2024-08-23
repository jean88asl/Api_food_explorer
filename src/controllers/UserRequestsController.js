const knex = require('../database/knex')
const moment = require("moment-timezone");
const AppError = require('../utils/App.Error');

class UserRequestsController {
    async create(request, response) {
        const { list_items, type, total } = request.body;
        const user_id = request.user.id;

        const currentTime = moment().tz("America/Sao_Paulo").format()

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
        const user_id = request.user.id
        const role = request.user.role

        if (role !== 'admin') {
            const dataRequests = await knex("user_requests").where({ user_id }).orderBy("id", 'desc')
            const dataItems = await knex("request_items").where({ id_user: user_id })

            const requestWithItems = dataRequests.map(data => {
                const itemsOfRequest = dataItems.filter(item => item.request_id === data.id)

                return {
                    ...data,
                    items: itemsOfRequest
                }
            })
            response.status(200).json(requestWithItems)
        } else {
            const dataRequestsAdm = await knex("user_requests").orderBy("id", 'desc')
            const dataItemsAdm = await knex("request_items")

            const requestWithItemsAdm = dataRequestsAdm.map(data => {
                const itemsOfRequest = dataItemsAdm.filter(item => item.request_id === data.id)

                return {
                    ...data,
                    items: itemsOfRequest
                }
            })

            response.status(200).json(requestWithItemsAdm)
        }
    }

    async update(request, response) {
        const { id, newStatus } = request.body
        const role = request.user.role

        const currentTime = moment().tz("America/Sao_Paulo").format()

        if (role === "admin") {
            await knex("user_requests")
                .where({ id })
                .update({
                    status: newStatus,
                    updated_at: currentTime
                })

            response.status(200).json("Dados atualizados com sucesso!")
        } else {
            throw new AppError("Usuário não tem permissão para efetuar a mudança")
        }
    }
}

module.exports = UserRequestsController