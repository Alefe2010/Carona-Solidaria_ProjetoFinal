import { SolicitacaoCarona } from "../entities/SolicitacaoCarona.ts"
import { UsuarioRepository } from "../repositories/UsuarioRepository.ts"
import { SolicitacaoRepository } from "../repositories/SolicitacaoRepository.ts"

export class SolicitacaoService {
    private solicitacaoRepo: SolicitacaoRepository
    constructor(
        solicitacaoRepo: SolicitacaoRepository
    ) {this.solicitacaoRepo = solicitacaoRepo}
    public async cadastrarSolicitacao(cpf:string, horario: string, idOferta:number): Promise<void> {}
   // public async buscarPorId(idSolicitacao: number): Promise<SolicitacaoCarona> {}
    public async atualizarDados(idSolicitacao: number, dados: object): Promise<void> {}
    public async excluirOferta(idOferta: number): Promise<void> {}
    public async solicitacaoAceita(idSolicitacao: number): Promise<void> {}
    public async solicitacaoNegada(idSolicitacao: number): Promise<void> {}

}
 