import express from "express"
const ofertaRouter = express.Router()
import { fileURLToPath } from "url";
import path from "path"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
    
ofertaRouter.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "oferta_corrida.html"))
})
ofertaRouter.get("/criar", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "criacao_oferta.html"))
})
ofertaRouter.get("/minhas-ofertas", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "minhas_ofertas.html"))
})

export default ofertaRouter;