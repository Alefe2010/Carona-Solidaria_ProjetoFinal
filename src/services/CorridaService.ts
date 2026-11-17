import type { SolicitacaoCarona } from "../entities/SolicitacaoCarona.ts";

export class CorridaService {
    constructor(
        private ofertaRepo: OfertaRepository,
        private solicitacaoRepo: SolicitacaoRepository,
        private corridaRepo: CorridaRepository
    ) {}
    public async criarCorrida(situacao: string, dataHoraFinal: string): Promise<void> {}

    public async buscarPorId(idCorrida: number): Promise<void> {}
    public async verificarSituacao(idCorrida: number): Promise<void> {}
    public async registrarParticipante(idSolicitacao: number, idCorrida: number): Promise<void> {}

    public async removerParticipante(idSolicitacao: number, idCorrida: number): Promise<void> { }

    public finalizarCorrida(idCorrida: number): void { }
    public iniciarCorrida(idCorrida: number): void {}

}