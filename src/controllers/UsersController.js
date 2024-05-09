const AppError = require("../utils/App.Error")

class UsersController {
    create(request, response) {
        const { name, age } = request.body

        if(!name){
            throw new AppError("Nome é obrigatório!")
        }

        response.status(201).json({name, age})
    }
}
module.exports = UsersController

