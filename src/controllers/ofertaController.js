import OfertaService from "../services/OfertaService"

async function criarOferta(req, res){
    const {numeroVagas, destino, origem, horario, cnh, placa} = req.body
    await OfertaService.cadastrarOferta(numeroVagas, destino, origem, horario, cnh, placa)
    res.status(200).json({message: "Cadastro de Oferta completo!"})
}

async function atualizarDados(req, res) {
    
    
}