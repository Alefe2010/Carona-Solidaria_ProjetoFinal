import {UsuarioService} from "../services/UsuarioService"

export async function atualizarDados(req, res) {
    const {email, nome, telefone, cnh} = req.body
    const idUsuario = req.params.id
    const dadosUsuario = {email: email, nome: nome, telefone: telefone, cnh: cnh}
    
    await UsuarioService.atualizarDados(idUsuario, dadosUsuario)
    
    return res.status(200).json({message: "Atualizado!"})
}

export async function buscarPorId(req, res){
    const usuario = await UsuarioService.buscarPorId(req.params.id)
    return res.status(200).json({usuario: usuario, message: "Busca concluída"})

}

export async function excluirUsuario(req, res){
    await UsuarioService.excluirUsuario(req.params.id)
    return res.status(200).json({message: "Deletado com sucesso!"})
}

export async function CarrosUsuario(req, res) {
    const carros = await UsuarioService.ProcurarCarros(req.params.id)
    return res.status(200).json({carros: carros})
}