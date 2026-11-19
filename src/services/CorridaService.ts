<<<<<<< HEAD
import type { SolicitacaoCarona } from "../entities/SolicitacaoCarona.ts";
import type { Corrida } from "../entities/Corrida.ts";

export class CorridaService {
    constructor(
        private ofertaRepo: OfertaRepository,
        private solicitacaoRepo: SolicitacaoRepository,
        private corridaRepo: CorridaRepository
    ) {}
=======
import type { Corrida } from "../entities/Corrida.ts";
import type { Usuario } from "../entities/Usuario.ts";
import type { SolicitacaoRepository } from "../repository/SolicitacaoRepository.ts"
import type { CorridaRepository } from "../repository/CorridaRepository.ts"


export class CorridaService {

    private solicitacaoRepo: SolicitacaoRepository
    private corridaRepo: CorridaRepository

    constructor(corridaRepo: CorridaRepository, solicitacaoRepo: SolicitacaoRepository){
        this.corridaRepo = corridaRepo
        this.solicitacaoRepo = solicitacaoRepo
    }
    
>>>>>>> 4fc2e642ea647f27f4bcd29521c03d0f5ea0b283
    public async criarCorrida(situacao: string): Promise<void> {
        await this.corridaRepo.cadastrarCorrida(situacao)
    }

    public async buscarPorId(idCorrida: number): Promise<Corrida> {
        if(!idCorrida){throw new Error("Sem id não é possível encontrar a corrida")}
        const corrida = await this.corridaRepo.buscarPorId(idCorrida)
        return corrida
    }
<<<<<<< HEAD
    public async registrarParticipante(idSolicitacao: number, idCorrida: number): Promise<void> {
        try{
            const solicitacao = await this.solicitacaoRepo.buscarPorId(idSolicitacao)
            const corrida = await this.corridaRepo.buscarPorId(idCorrida)
            solicitacao.
        }
        catch{
            
        }
    
    }

    public async removerParticipante(idSolicitacao: number, idCorrida: number): Promise<void> { }

    public finalizarCorrida(idCorrida: number): void { }
    public iniciarCorrida(idCorrida: number): void {}
=======
    public async ListarParticipantesCorrida(idCorrida:number): Promise<Usuario[]>{
        let corrida: Corrida = await this.corridaRepo.buscarPorId(idCorrida)
        let participantes: Usuario[] = await this.solicitacaoRepo.filtrarSolicAceitas(corrida.idOferta)
        return participantes
    }

    public async finalizarCorrida(idCorrida: number): Promise<void> { 
        await this.corridaRepo.finalizarCorrida(idCorrida)
    }
>>>>>>> 4fc2e642ea647f27f4bcd29521c03d0f5ea0b283

}
