const AppError = require("../utils/App.Error")

function checkUserAuthorization(roleToVerify) {
    return (request, response, next) => {
        const { role } = request.user


        if (!roleToVerify.includes(role)) {
            throw new AppError("Unauthorized", 401)
        }

        return next()
    }
}

module.exports = checkUserAuthorization