import {OfertaService} from "../services/OfertaService.ts"
import { OfertaCaronaRepository } from "../repositories/OfertaRepository.ts"
import { UsuarioRepository} from "../repositories/UsuarioRepository.ts"
import { UsuarioService } from "../services/UsuarioService.ts"
import jwt from "jsonwebtoken"
import cookieParser from 'cookie-parser';

const ofertaRepository = new OfertaCaronaRepository()
const usuarioRepository = new UsuarioRepository()
const usuarioService = new UsuarioService(usuarioRepository)
const ofertaService = new OfertaService(ofertaRepository)


export const buscarOfertas = async(req, res)=>{
    try{
        const ofertas = await ofertaService.buscarOfertas()
        res.status(200).json({ofertas: ofertas})
    }catch(err){
        res.status(500).json({message: "erro: " + err})
    }
}
export const criarOferta = async (req, res)=> {
    const {numeroVagas, destino, origem, dataHora, placa} = req.body
    const token = req.cookie.token
    const emailUser = jwt.verify(token, process.env.jwt_secret).email
    const idUser = usuarioService.buscarPorEmail(emailUser).idUsuario 


    if(!numeroVagas|| !destino || !origem || !dataHora || !placa){
        res.status(400).json({message: "Dados inválidos!"})
    }

    await OfertaService.cadastrarOferta(numeroVagas, origem, destino, dataHora, idUser, placa)
    res.status(200).json({message: "Cadastro de Oferta completo!"})
}

export const atualizarDados = async(req, res) => {
    const {origem, destino, dataHora, qntdVagas} = req.body
    const idOferta = req.params.id
    const dadosOferta = {origem: origem, destino: destino, dataHora: dataHora, qntdVagas: qntdVagas}
    
    await OfertaService.atualizarDados(idOferta, dadosOferta)
    
    return res.status(200).json({message: "Atualizado!"})
}

export const buscarPorId = async(req, res) => {
    const oferta = await OfertaService.buscarPorId(req.params.id)
    return res.status(200).json({oferta: oferta, message: "Busca concluída"})

}

export const filtrarOfertas = async(req, res) => {
    const filtros = req.body
    const ofertasFiltradas = await OfertaService.filtrarOfertas(filtros)
    return res.status(200).json({ofertasFiltradas: ofertasFiltradas})
}

export const excluirOferta = async(req, res)=>{
    await OfertaService.excluirOferta(req.params.id)
    return res.status(200).json({message: "Deletado com sucesso!"})
}

export const buscarOfertasDeUsuario = async (req, res) =>{
    try{
        const token = req.cookies?.token
        const payload = jwt.verify(token, process.env.jwt_secret)
        const idUser = payload.CPF
        const ofertas =  await ofertaService.buscarOfertasDeUsuario(idUser)
        if(!ofertas){return res.status(404).json({message: "Não encontrado"})}
        return res.status(200).json({ofertas: ofertas})
    }
    catch(err){
        return res.status(500).json({message: "Erro interno do servidor"})
    }
}

export const qntdOfertasUsuario = async(req, res)=>{
    
}
