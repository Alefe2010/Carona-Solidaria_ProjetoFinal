
import { AvaliacaoRepository } from "../repositories/AvaliacaoRepository.ts";
import { UsuarioRepository } from "../repositories/UsuarioRepository.ts";
export class AvaliacaoService {
    
    constructor(
        private AvaliacaoRepo: AvaliacaoRepository,
        private UsuarioRepo: UsuarioRepository,
    ) {}
    public async fazerAvaliacao(idUsuario: number, idCorrida: number, nota: number, comentario: string, tipoAvaliador: string): Promise<any> {
    return this.AvaliacaoRepo.criarAvaliacao(idUsuario, idCorrida, nota, comentario, tipoAvaliador)
    }

    public async filtrarAvaliacoes(idUsuario: number): Promise<any> {
    return this.AvaliacaoRepo.filtrarAvaliacaoUsuario(idUsuario);
    }
    public async mediaAvaliacoes(idUsuario: number): Promise<any> {
     const avaliacoes = await this.filtrarAvaliacoes(idUsuario);      
    let soma = 0;
    for (let i = 0; i < avaliacoes.length; i++) {
        soma += avaliacoes[i].nota;
    }
    if (avaliacoes.length === 0) {
        return 0;
    }
    return soma / avaliacoes.length;
}
       
    }
