import SolicitacaoService from "../services/SolicitacaoService.ts"

export async function cadastrarSolicitacao(req, res){
    const {idUsuario, idOferta, situacao, horario} = req.body
    await SolicitacaoService.criarSolicitacao(idUsuario, idOferta, situacao, horario)
    return res.status(200).json({message: "Solicitação cadastrada no sistema!"})
}
export async function buscarPorId(req, res) {
    const solicitacao = await SolicitacaoService.buscarPorId(req.params.id)
    return res.status(200).json({solicitacao: solicitacao})    
}

export async function atualizarDados(req, res) {

    const {idUsuario, idOferta, situacao, horario} = req.body
    const idSolicitacao = req.params.id
    const dadosOferta = {idUsuario: idUsuario, idOferta: idOferta, situacao: situacao, horario: horario}
    
    await SolicitacaoService.atualizarDados(idSolicitacao, dadosOferta)
    
    return res.status(200).json({message: "Atualizado!"})
}

export async function excluirSolicitacao(req, res){
    await SolicitacaoService.excluirSolicitacao(req.params.id)
    return res.status(200).json({message: "Deletado com sucesso!"})
}

export async function situacaoAceita(req, res) {
    await SolicitacaoService.situacaoAceita(req.params.id)
    res.status(200).json({message: "Solicitação aceita!"})
}
export async function situacaoNegada(){
    await SolicitacaoService.situacaoNegada(req.params.id)
    res.status(200).json({message: "Solicitação negada!"})
}

export async function filtrarSolAceitas(req, res) {
    const idSolicitacao = req.params.id
    const solicitacoes = await SolicitacaoService.filtrarSolAceitas(idSolicitacao)
    res.status(200).json({solicitacoes: solicitacoes})
}