import { SolicitacaoCarona } from "../entities/SolicitacaoCarona.ts"
import type { OfertaCaronaRepository } from "../repositories/OfertaRepository.ts"
import { SolicitacaoRepository } from "../repositories/SolicitacaoRepository.ts"
import type { UsuarioRepository } from "../repositories/UsuarioRepository.ts"
import type { Usuario } from "../entities/Usuario.ts"

// Alefe, eu to aplicando aqui as regras de negocios e verificações para esse negocio nao virar bagunça. 
// Coloquei os repositorios de usuario e oferta pois na rota da api, se alguem colocar algum id falso, o negocio pode dar erro. 
// Precisa verificar tbm se o usuario que faz a solicitação é diferente de quem fez a oferta

export class SolicitacaoService {
    private solicitacaoRepo: SolicitacaoRepository
    private usuarioRepo: UsuarioRepository
    private ofertaRepo: OfertaCaronaRepository
    //private ofertaService: OfertaService ---> caso o rubens responda meu email e diga que sim
    // private usuarioService: UsuarioService
    constructor(
        solicitacaoRepo: SolicitacaoRepository,
        usuariroRepo: UsuarioRepository,
        ofertarepo: OfertaCaronaRepository
        // ofertaService: OfertaService
        // usuarioService: UsuarioService

    ) {
        this.solicitacaoRepo = solicitacaoRepo
        this.usuarioRepo = usuariroRepo
        this.ofertaRepo = ofertarepo
        // this.ofertaService = ofertaService
        // this.usuarioService = usuarioService
    }
    public async cadastrarSolicitacao(cpf:string, horario: string, idOferta:number): Promise<void> {
        if(!cpf || !horario || !idOferta){throw new Error("Dados inválidos. Preencha todos")}
        let existUser = await this.usuarioRepo.buscarPorCPF(cpf)
        let existOffer = await this.ofertaRepo.buscarPorId(idOferta)
        if(!existOffer){}
        if(!existOffer){}
        if(existOffer?.idMotorista === cpf){throw new Error("Não pode solicitar uma carona para sua própria carona!")}
    }

    // completo
    public async buscarPorId(idSolicitacao: number): Promise<SolicitacaoCarona>{
        if(!idSolicitacao){throw new Error("Não é possível buscar a solicitação")}
        const solicitacao: SolicitacaoCarona | null = await this.solicitacaoRepo.buscarPorId(idSolicitacao)
        if(!solicitacao){throw new Error("Não existe uma solicitação com este id")}
        return solicitacao
    }
    public async atualizarDados(idSolicitacao: number, dados: object): Promise<void> {}
    public async excluirSolicitacao(idSolicitacao: number, cpf:string): Promise<void> {
        if(!idSolicitacao || !cpf){throw new Error("Não é possível excluir a solicitação sem fornecer o ID dela ou sem seu identificador")}
        const existSol = await this.buscarPorId(idSolicitacao)
        if(!existSol){throw new Error("Não existe uma solicitação com este ID")}
        if(existSol.CPF != cpf){throw new Error("Sem autorização para excluir a solicitação")}
        await this.solicitacaoRepo.excluirSolicitacao(idSolicitacao)
    }

    //completo
    public async solicitacaoAceita(idSolicitacao: number,): Promise<void> {
        if(!idSolicitacao){throw new Error("Não é possível mudar o estado da solicitação sem fornecer o ID dela")}
        const existSolicitacao = this.solicitacaoRepo.buscarPorId(idSolicitacao) 
        if(!existSolicitacao){throw new Error("Solicitação não encontrada")}
        this.solicitacaoRepo.mudarSituacaoAceito(idSolicitacao)
    }
    public async solicitacaoNegada(idSolicitacao: number, cpf:string): Promise<void> {}

}
 