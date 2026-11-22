class Avaliacao {
    constructor(public comentario: string, public nota: number, public tipoAvaliador: string) {
        this.comentario = comentario;
        this.nota = nota;
        this.tipoAvaliador = tipoAvaliador
    }
    public verNota(): number {
        return this.nota
    }
    public verComentario(): string {
        return this.comentario
    }
}

export default Avaliacao;