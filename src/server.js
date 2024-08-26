require("dotenv/config")
require("express-async-errors")

const cors = require("cors")
const express = require("express")

const AppError = require("./utils/App.Error")
const uploadConfig = require("./configs/upload")

const routes = require("./routes")

const app = express()
app.use(cors())
app.use(express.json())

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes)

app.use((error, request, response, next) => {
    if(error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    }
    // logando erro no console
    console.log(error)
    // logando erro no nosso lado
    return response.status(500).json({
        status: "error",
        message: "Internal server error"
    })
})

const PORT = process.env.PORT || 3333
app.listen(PORT, () => console.log(`Acesse aqui http://localhost.com:${PORT}`))