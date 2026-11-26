import VeiculoService from "../services/VeiculoService.ts";
import { VeiculoRepository } from "../repositories/VeiculoRepository.ts";
import { Veiculo } from "../entities/Veiculo.ts";

import jwt from "jsonwebtoken"
import cookieParser from 'cookie-parser';

const veiculoRepository = new VeiculoRepository()
const veiculoService = new VeiculoService(veiculoRepository)

export const buscarVeiculos = async(req, res)=>{
    try{
        const veiculos = await veiculoService.buscarVeiculos()
        res.status(200).json({veiculos: veiculos})
    }catch(err){
        res.status(500).json({message: "erro: " + err})
    }
}
export const cadastrarVeiculo = async (req, res)=> {
    const {placa, qtd_acentos, cor, modelo} = req.body
    const token = req.cookie.token
    const CPFUser = jwt.verify(token, process.env.jwt_secret).CPF
    
    if(!placa|| !qtd_acentos || !cor || !modelo){
        res.status(400).json({message: "Dados inválidos!"})
    }

    await veiculoService.cadastrarVeiculo(placa, qtd_acentos, cor, modelo, CPFUser)
    res.status(200).json({message: "Cadastro de Oferta completo!"})
}

export const atualizarDados = async(req, res) => {
    const {qtd_acentos, cor, modelo} = req.body
    const placa = req.params.id
    const dadosOferta = {qtd_acentos: qtd_acentos, cor: cor, modelo: modelo}
    
    await veiculoService.atualizarDados(placa, dadosOferta)
    
    return res.status(200).json({message: "Atualizado!"})
}

export const buscarPorId = async(req, res) => {
    const veiculo = await veiculoService.buscarPorId(req.params.id)
    return res.status(200).json({veiculo: veiculo, message: "Busca concluída"})

}

export const excluirVeiculo = async(req, res)=>{
    await veiculoService.excluirOferta(req.params.id)
    return res.status(200).json({message: "Deletado com sucesso!"})
}

export const buscarVeiculosUsuario = async (req, res) =>{
    try{
        const token = req.cookies?.token
        const payload = jwt.verify(token, process.env.jwt_secret)
        const idUser = payload.CPF
        const veiculos =  await veiculoService.buscarVeiculosUsuario(idUser)
        if(!ofertas){return res.status(404).json({message: "Não encontrado"})}
        return res.status(200).json({veiculos: veiculos})
    }
    catch(err){
        return res.status(500).json({message: "Erro interno do servidor"})
    }
}
