import { Oferta } from "../entities/OfertaCarona.js"

export class OfertaService {
    constructor(
        private usuarioRepo: UsuarioRepository,
        private ofertaRepo: OfertaRepository,
        private veiculoRepo: VeiculoRepository
    ) {}

    public async cadastrarOferta(idUsuario: number, numVagas: number, origem: string, destino: string): Promise<void> {
        //método no repository
    }
    public async buscarPorId(idOferta: number): Promise<Oferta> {
        //método no repository
    }
    public async atualizarDados(idOferta: number, dados: JSON): Promise<void>{
        //para completar
    }
    public async excluirOferta(idOferta: number): Promise<void> {
        //método no repository
    }
    public async filtrarHorario(hora: string){
    }
    public filtraRegiao(regiao: string){   
    }
    public filtraCarro(tipoCarro: string){
    }
    public filtraDestino(destino: string){
    }
}