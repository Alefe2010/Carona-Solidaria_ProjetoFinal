import Solicitacao from "../entities/SolicitacaoCarona.ts"
import { UsuarioRepository } from "../repositories/UsuarioRepository.ts"
import { SolicitacaoRepository } from "../repositories/SolicitacaoRepository.ts"


export class SolicitacaoService {
    constructor(
        private usuarioRepo: UsuarioRepository,
        private solicitacaoRepo: SolicitacaoRepository
    ) {}
    public async cadastrarSolicitacao(idUsuario: number, situacao: string, horario: string): Promise<void> {}
    public async buscarPorId(idSolicitacao: number): Promise<Solicitacao> {}
    public async atualizarDados(idSolicitacao: number, dados: JSON): Promise<void> {}
    public async excluirOferta(idOferta: number): Promise<void> {}
    public async filtrarQntdVaga(qntdVaga: number): Promise<void> {}
    public async solicitacaoAceita(idSolicitacao: number): Promise<void> {}
    public async solicitacaoNegada(idSolicitacao: number): Promise<void> {}

}