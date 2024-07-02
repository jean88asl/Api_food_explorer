const knex = require('../database/knex')
const { hash } = require('bcryptjs')
const AppError = require("../utils/App.Error")

class UsersController {
    async create(request, response) {
        const { name, email, password } = request.body

        if (!name || !email || !password) {
            throw new AppError("Todos os dados são obrigatórios!")
        }

        const userExist = await knex("users").where({ email }).first()

        if (userExist) {
            throw new AppError("Email já cadastrado!")
        }

        const hashedPassword = await hash(password, 8)

        const user = {
            name,
            email,
            password: hashedPassword,
        }

        await knex("users").insert(user)

        response.status(201).json("dados gravados com sucesso")
    }
}

module.exports = UsersController

