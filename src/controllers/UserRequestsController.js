class UserRequestsController {
    create(request, response) {
        const { list, total, type_payment } = request.body

        //pegando o id do usuário no cabeçalho da requisição 
        const user_id = request.user.id
        
        const requestUser = {
            list,
            total,
            type_payment
        }

        response.json(requestUser)
    }
}

module.exports = UserRequestsController