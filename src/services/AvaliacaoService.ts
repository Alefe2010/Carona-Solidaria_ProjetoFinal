import { AvaliacaoRepository } from "../repositories/AvaliacaoRepository.ts";
import { UsuarioRepository } from "../repositories/UsuarioRepository.ts";
import type { Avaliacao } from "../entities/Avaliacao.ts"

export class AvaliacaoService {
    constructor(
        private AvaliacaoRepo: AvaliacaoRepository,
        private UsuarioRepo: UsuarioRepository,
    ) {}
    public async fazerAvaliacao(idUsuario: number, idCorrida: number, nota: number, 
    comentario: string, tipoAvaliador: string): Promise<void> {
        await this.AvaliacaoRepo.criarAvaliacao(idUsuario, idCorrida, nota, comentario, tipoAvaliador)
    }
    public async filtrarAvaliacoes(idUsuario: number): Promise<Avaliacao[]> {
        const avaliacoes = await this.AvaliacaoRepo.filtrarAvaliacaoUsuario(idUsuario)
        return avaliacoes
    }
    public async mediaAvaliacoes(idUsuario: number): Promise<Number> {
        const avaliacoes = await this.filtrarAvaliacoes(idUsuario);      
        let soma = 0
        if (avaliacoes.length === 0) {
            return 0
        }
        for (let i = 0; i < avaliacoes.length; i++) {
            soma += avaliacoes[i].nota;
        }
        return soma / avaliacoes.length;
    }
}

