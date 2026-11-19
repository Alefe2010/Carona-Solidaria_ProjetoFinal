<<<<<<< HEAD
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
=======
import type { OfertaCarona } from "../entities/OfertaCarona.ts"
import { OfertaRepository } from "../repository/OfertaRepository.ts"
import { UsuarioRepository} from "../repository/UsuarioRepository.ts"


export class OfertaService{
    private ofertaRepo: OfertaRepository
    private usuarioRepo: UsuarioRepository
    constructor(
        ofertaRepo: OfertaRepository, 
        usuarioRepo: UsuarioRepository
    ){
        this.ofertaRepo = ofertaRepo
        this.usuarioRepo = usuarioRepo
    }
    public async criarOferta(
        numeroVagas:number, 
        origem:string, 
        destino: string, 
        horario: string, 
        cpf: string, 
        placa:string): Promise<void>{

        if(!numeroVagas || !origem || !destino || !horario || !cpf || !placa){
            throw new Error("Campos inválidos ou faltando")
        }
        await this.usuarioRepo.criarOferta(numeroVagas, origem, destino, horario, cpf, placa)

    }
    public async buscarPorId(idOferta:number): Promise<OfertaCarona>{
        if(!idOferta){
            throw new Error("Nenhum identificador fornecido!")
        }
        return await this.usuarioRepo.buscarPorId(idOferta)

    }

    public async atualizarDados(idOferta:number, dados: object): Promise<void>{
        if(!idOferta){
            throw new Error("Nenhum identificador fornecido!")
        }
        const dadosValidos: Record<string, any> = dados
        
        for(let dado in dadosValidos){
            if(!dadosValidos[dado]){
                delete dadosValidos[dado]
            }
        }
        if(Object.keys(dadosValidos).length === 0){
            throw new Error("Sem nenhum dado válido!")
        }

        await this.ofertaRepo.atualizarDados(idOferta, dadosValidos)
    }

    public async excluirOferta(idOferta:number): Promise<void>{
        if(!idOferta){throw new Error("Nenhum identificador fornecido!")}
        await this.ofertaRepo.excluirOferta(idOferta)
    }

    public async filtroOfertas(idOferta: number, filtro: object){
        return await this.ofertaRepo.filtroOfertas(idOferta, filtro) 

    }

}

>>>>>>> 4fc2e642ea647f27f4bcd29521c03d0f5ea0b283
