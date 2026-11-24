import { AvaliacaoRepository } from "../repositories/AvaliacaoRepository.ts";
import { UsuarioRepository } from "../repositories/UsuarioRepository.ts";
import type { Avaliacao } from "../entities/Avaliacao.ts"

export class AvaliacaoService {
    constructor(
        private AvaliacaoRepo: AvaliacaoRepository,
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
        let quantidadeValida = 0

        for (let i = 0; i < avaliacoes.length; i++) {
            const avaliacao = avaliacoes[i]?.nota
            if (avaliacao !== undefined) {
                soma += avaliacao
                quantidadeValida++
            }
        }

        const media = quantidadeValida > 0 ? soma / quantidadeValida : 0
        return media
    }
}

