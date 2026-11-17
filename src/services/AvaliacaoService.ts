
export class AvaliacaoService {
    constructor(
        private avaliacaoRepo: AvaliacaoRepository,
        private usuarioRepo: UsuarioRepository
    ) {}
    public async fazerAvaliacao(idUsuario: number, idCorrida: number, nota: number, comentario: string, tipoAvaliador: string): Promise<void> {}
    public async filtrarAvaliacoes(idUsuario: number): Promise<void> {}
    public async mediAvaliacoes(idUsuario: number): Promise<void> {}
}