import express from "express"
const veiculoApiRouter = express.Router()

import {cadastrarVeiculo, atualizarDados, excluirVeiculo, buscarPorId, buscarVeiculosUsuario, buscarVeiculos} from "../controllers/veiculoController.js"

veiculoApiRouter.get("/", buscarVeiculos)

veiculoApiRouter.get("/meus-veiculos", buscarVeiculosUsuario)

veiculoApiRouter.get("/:id", buscarPorId)

veiculoApiRouter.post("/criar", cadastrarVeiculo)

veiculoApiRouter.put("/:id", atualizarDados)

veiculoApiRouter.patch("/:id", atualizarDados)

veiculoApiRouter.delete("/:id", excluirVeiculo)

export default veiculoApiRouter
