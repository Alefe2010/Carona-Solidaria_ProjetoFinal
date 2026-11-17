import { Oferta } from "../entities/OfertaCarona.ts"
import { Veiculo } from "../entities/Veiculo.ts"
import { Motorista } from "../entities/Motorista.ts"

export class OfertaService {
    constructor(
        private usuarioRepo: UsuarioRepository,
        private ofertaRepo: OfertaRepository,
        private veiculoRepo: VeiculoRepository
    ) {}

    public async cadastrarOferta(numVagas: number, origem: string, destino: string, motorista: Motorista, veiculo: Veiculo): Promise<void> {
        await this.ofertaRepo.cadastrarOferta(numVagas, origem, destino, motorista, veiculo)
    }
    public async buscarPorId(idOferta: number): Promise<Oferta> {
        return await this.ofertaRepo.buscarPorId(idOferta)
    }
    public async atualizarDados(idOferta: number, dados: object): Promise<void>{
        await this.ofertaRepo.atualizarDados(idOferta, dados)
    }
    public async excluirOferta(idOferta: number): Promise<void> {
        await this.ofertaRepo.excluirOferta(idOferta)
    }
    public async filtrarHorario(hora: string){
        return await this.ofertaRepo.filtrarHorario(hora) // aqui vai usar 
    }
    public filtraRegiao(regiao: string){   
        return await this.ofertaRepo.filtraRegiao(regiao) // aqui vai usar select * from oferta where regiao = ?
    }
    public filtraCarro(tipoCarro: string){
        select blablab.execute('SELECT blabla WHERE ${filtro1.nome}=${filtro1.value} AND ${filtro2.nome}=',[])
    }
    public filtraDestino(destino: string){
    }
}
