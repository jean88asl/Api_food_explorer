class UserRequestsController {
    create(request, response) {
        const {list, total, type_payment} = request.body

        const requestUser = {
            list,
            total,
            type_payment
        }

        response.json(requestUser)
    }
} 

module.exports = UserRequestsController