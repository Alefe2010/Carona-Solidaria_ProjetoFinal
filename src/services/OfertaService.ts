import type { OfertaCarona } from "../entities/OfertaCarona.ts"
import { OfertaCaronaRepository } from "../repositories/OfertaRepository.ts"
import type { Motorista } from "../entities/Motorista.ts"

interface FiltroOferta {
    origem?: string;
    destino?: string;
}

export class OfertaService{
    constructor(
        private ofertaRepo: OfertaCaronaRepository, 
    ){ this.ofertaRepo = ofertaRepo}

    public async criarOferta(
        idOferta: number,
        numeroVagas:number, 
        origem:string,
        destino: string, 
        horario: string, 
        motorista: Motorista): Promise<void>{

        if(!idOferta || !numeroVagas || !origem || !destino || !horario || !motorista){
            throw new Error("Campos inválidos ou faltando")
        }
        await this.ofertaRepo.cadastrarOferta(idOferta, numeroVagas,horario, origem, destino,  motorista)

    }
    public async buscarPorId(idOferta:number): Promise<OfertaCarona | null>{
        if(!idOferta){
            throw new Error("Nenhum identificador fornecido!")
        }
        const corrida = await this.ofertaRepo.buscarPorId(idOferta)
        return corrida || null

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
        await this.ofertaRepo.atualizarDados(idOferta, dadosValidos as OfertaCarona)
    }

    public async excluirOferta(idOferta:number): Promise<void>{
        if(!idOferta){throw new Error("Nenhum identificador fornecido!")}
        await this.ofertaRepo.excluirOferta(idOferta)
    }

    public async filtroOfertas( filtro: FiltroOferta){
        if (filtro.origem) {
        return await this.ofertaRepo.filtrarPorRegiao(filtro.origem);
        }

        if (filtro.destino) {
            return await this.ofertaRepo.filtrarPorDestino(filtro.destino);
        }
        throw new Error("Informe pelo menos um filtro válido (região de origem ou destino)!");
    } 

    }   


