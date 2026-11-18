import express from "express"
const app = express()
const PORT = 3000
import cookieParser from "cookie-parser"
import verifyJWT from "./src/middleware/auth.js"
import dotenv from "dotenv-safe";
import authRouter from "./src/routes/authRoutes.js"

dotenv.config()
app.use(express.static('public'));
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))

app.use("/auth", authRouter)

app.get("/", verifyJWT, (req, res) => {
    res.send("Bem-vindo ao sistema! Você está logado!"); 
});

app.listen(PORT, () => {
    console.log(`Ta rodando em http://localhost:${PORT}`)
})
