class UsersController {
    create(request, response) {
        const { name, age } = request.body

        response.json({name, age})
    }
}
module.exports = UsersController

