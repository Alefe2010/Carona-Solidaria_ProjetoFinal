import OfertaService from "../services/OfertaService"

export async function criarOferta(req, res){
    const {numeroVagas, destino, origem, horario, cpf, placa} = req.body
    if(!numeroVagas|| !destino || !origem || !horario || !cnh || !placa){
        res.status()
    }
    await OfertaService.cadastrarOferta(numeroVagas, origem, destino, horario, cpf, placa)
    res.status(200).json({message: "Cadastro de Oferta completo!"})
}

export async function atualizarDados(req, res) {

    const {origem, destino, dataHora, qntdVagas} = req.body
    const idOferta = req.params.id
    const dadosOferta = {origem: origem, destino: destino, dataHora: dataHora, qntdVagas: qntdVagas}
    
    await OfertaService.atualizarDados(idOferta, dadosOferta)
    
    return res.status(200).json({message: "Atualizado!"})
}

export async function buscarPorId(req, res){
    const oferta = await OfertaService.buscarPorId(req.params.id)
    return res.status(200).json({oferta: oferta, message: "Busca concluída"})

}

export async function filtrarOfertas(req, res) {
    const filtros = req.body
    const ofertasFiltradas = await OfertaService.filtrarOfertas(filtros)
    return res.status(200).json({ofertasFiltradas: ofertasFiltradas})
}

export async function excluirOferta(req, res){
    await OfertaService.excluirOferta(req.params.id)
    return res.status(200).json({message: "Deletado com sucesso!"})
}

