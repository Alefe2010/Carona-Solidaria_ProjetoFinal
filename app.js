import express from "express"
const app = express()
const PORT = 3000
import cookieParser from "cookie-parser"
import verifyJWT from "./src/middleware/auth.js"
import dotenv from "dotenv-safe";
import authRouter from "./src/routes/authRoutes.js"
import { fileURLToPath } from "url";
import path from "path"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config()
app.use(express.static('public'));
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))

app.use("/auth", authRouter)

app.get("/", verifyJWT, (req, res) => {
    res.sendFile(path.join(__dirname, "src", "views", "tela_motorista.html"))
});

app.get("/oferta", verifyJWT, (req, res) => {
    res.sendFile(path.join(__dirname, "src", "views", "new_oferta.html"));
});

app.listen(PORT, () => {
    console.log(`Ta rodando em http://localhost:${PORT}`)
})
