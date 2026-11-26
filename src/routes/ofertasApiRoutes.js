import express from "express"
const ofertaApiRouter = express.Router()
import {buscarOfertas, buscarPorId, atualizarDados, criarOferta, excluirOferta, buscarOfertasDeUsuario, filtrarOfertas} from "../controllers/ofertaController.js"

ofertaApiRouter.get("/", buscarOfertas)

ofertaApiRouter.get("/filtro", filtrarOfertas)

ofertaApiRouter.get("/minhas-ofertas", buscarOfertasDeUsuario)

ofertaApiRouter.post("/criar", criarOferta)

ofertaApiRouter.put("/:id", atualizarDados)

ofertaApiRouter.patch("/:id", atualizarDados)

ofertaApiRouter.delete("/:id", excluirOferta)

export default ofertaApiRouter