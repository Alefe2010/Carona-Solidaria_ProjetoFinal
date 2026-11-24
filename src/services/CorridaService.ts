import type { Corrida } from "../entities/Corrida.ts";
import type { Usuario } from "../entities/Usuario.ts";
import type { SolicitacaoRepository } from "../repositories/SolicitacaoRepository.ts"
import type { CorridaRepository } from "../repositories/CorridaRepository.ts"


export class CorridaService {
    private solicitacaoRepo: SolicitacaoRepository
    private corridaRepo: CorridaRepository

    constructor(corridaRepo: CorridaRepository, solicitacaoRepo: SolicitacaoRepository){
        this.corridaRepo = corridaRepo
        this.solicitacaoRepo = solicitacaoRepo
    }
<<<<<<< HEAD
    
=======
>>>>>>> origin/main
    public async criarCorrida(situacao: string): Promise<void> {
        await this.corridaRepo.cadastrarCorrida(situacao)
    }

    public async buscarPorId(idCorrida: number): Promise<Corrida> {
        if(!idCorrida){throw new Error("Sem id não é possível encontrar a corrida")}
        const corrida = await this.corridaRepo.buscarPorId(idCorrida)
        return corrida
    }
    public async ListarParticipantesCorrida(idCorrida:number): Promise<Usuario[]>{
        let corrida: Corrida = await this.corridaRepo.buscarPorId(idCorrida)
        let participantes: Usuario[] = await this.solicitacaoRepo.filtrarSolicAceitas(corrida.idOferta)
        return participantes
    }

    public async finalizarCorrida(idCorrida: number): Promise<void> { 
        await this.corridaRepo.finalizarCorrida(idCorrida)
    }
<<<<<<< HEAD
=======

>>>>>>> origin/main

}
