import type { Corrida } from "../entities/Corrida.ts";
import type { Usuario } from "../entities/Usuario.ts";
import type { SolicitacaoRepository } from "../repositories/SolicitacaoRepository.ts"
import type { CorridaRepository } from "../repositories/CorridaRepository.ts"
import { error } from "node:console";


export class CorridaService {
    private solicitacaoRepo: SolicitacaoRepository
    private corridaRepo: CorridaRepository

    constructor(corridaRepo: CorridaRepository, solicitacaoRepo: SolicitacaoRepository){
        this.corridaRepo = corridaRepo
        this.solicitacaoRepo = solicitacaoRepo
    }
    public async criarCorrida(idOferta: number): Promise<void> {
        await this.corridaRepo.cadastrarCorrida(idOferta)
    }

    public async buscarPorId(idCorrida: number): Promise<Corrida | null> {
        if(!idCorrida){throw new Error("Sem id não é possível encontrar a corrida")}
        const corrida = await this.corridaRepo.buscarPorId(idCorrida)
        return corrida || null
    }
    public async ListarParticipantesCorrida(idCorrida:number): Promise<Usuario[]>{
        let corrida: Corrida | null = await this.corridaRepo.buscarPorId(idCorrida)
        if(!corrida){throw new Error("Não existe corrida com este ID")}
        
        let participantes: Usuario[] = await this.solicitacaoRepo.filtrarSolicAceitas(corrida.idOferta)
        return participantes
    }

    public async finalizarCorrida(idCorrida: number): Promise<void> { 
        await this.corridaRepo.finalizarCorrida(idCorrida)
    }

}