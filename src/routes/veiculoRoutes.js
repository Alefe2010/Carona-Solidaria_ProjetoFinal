import express from "express"
const veiculoRouter = express.Router()
import { fileURLToPath } from "url";
import path from "path"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
    
veiculoRouter.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "veiculos.html"))
})

export default veiculoRouter;