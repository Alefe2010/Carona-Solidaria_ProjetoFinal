import db from "../database/db.js"
import type {Avaliacao} from "../entities/Avaliacao.ts"; 

export class AvaliacaoRepository{
    constructor(){}

    async criarAvaliacao(id_corrida: number, nota: number, comentario: string, tipoAvaliador: string, id_usuario: number): Promise<void> {
        const oi = `INSERT INTO AVALIACAO (id_corrida, nota, comentario, tipoAvaliador, id_usuario) VALUES (?, ?, ?, ?, ?)`;
        const valores = [id_corrida, nota, comentario, tipoAvaliador, id_usuario];

        await db.execute(oi, valores);
    }

    async buscarPorId(id_avaliacao: number): Promise<Avaliacao | null> {
        const busca = `SELECT * FROM AVALIACAO WHERE id_avaliacao = ?`;
        const [resultado] = await db.execute(busca, [id_avaliacao]);

        const linhas = resultado as Avaliacao[];
        return linhas[0] || null;
    }

    async filtrarAvaliacaoUsuario(id_usuario: number): Promise<Avaliacao[]> {
        const busca = `SELECT * FROM AVALIACAO WHERE id_usuario = ?`;
        const [resultado] = await db.execute(busca, [id_usuario]);

        return resultado as Avaliacao[];
    }
}