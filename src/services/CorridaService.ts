import type { SolicitacaoCarona } from "../entities/SolicitacaoCarona.ts";
import type { Corrida } from "../entities/Corrida.ts";

export class CorridaService {
    constructor(
        private ofertaRepo: OfertaRepository,
        private solicitacaoRepo: SolicitacaoRepository,
        private corridaRepo: CorridaRepository
    ) {}
    public async criarCorrida(situacao: string): Promise<void> {
        await this.corridaRepo.cadastrarCorrida(situacao)
    }

    public async buscarPorId(idCorrida: number): Promise<Corrida> {
        if(!idCorrida){throw new Error("Sem id não é possível encontrar a corrida")}
        const corrida = await this.corridaRepo.buscarPorId(idCorrida)
        return corrida
    }
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

}
