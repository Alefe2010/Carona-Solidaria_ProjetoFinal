import {SolicitacaoCarona} from "../entities/SolicitacaoCarona.ts"
import db from "../database/db.js"

export class SolicitacaoRepository {
    constructor(){}
    async cadastrarSolicitacao(qtdVaga: number, horario: string, id_usuario: number): Promise<void> {
        const queryCadastro = `INSERT INTO SOLICITACAO (qtdVaga, horario, id_usuario) VALUES (?, ?, ?)`;
        const valores = [qtdVaga, horario, id_usuario];

        await db.execute(queryCadastro, valores);
    }

    async buscarPorId(id_solicitacao: number): Promise<SolicitacaoCarona | null> {
        const queryBusca = `SELECT * FROM SOLICITACAO WHERE id_solicitacao = ?`;
        const [resultado] = await db.execute(queryBusca, [id_solicitacao]);

        const solicitacao = resultado as SolicitacaoCarona[];
        return solicitacao[0] ?? null;
    }

    public async atualizarDados(id_solicitacao: number, dados: Record<string, any>): Promise<void> {
        const oi = `UPDATE SOLICITACAO SET qtdVaga = ?, horario = ? WHERE id_solicitacao = ?`;
        const valores = [dados.qtdVaga, dados.horario, id_solicitacao];

        await db.execute(oi, valores);
    }

    public async excluirSolicitacao(id_solicitacao: number): Promise<void> {
        const oi = `DELETE FROM SOLICITACAO WHERE id_solicitacao = ?`;
        
        await db.execute(oi, [id_solicitacao]);
    }

    public async filtrarPorHorario(horario: string): Promise<SolicitacaoCarona[]> {
        const busca = `SELECT * FROM SOLICITACAO WHERE horario = ?`;
        const [rows] = await db.execute(busca, [horario]);
        const resultado = rows as SolicitacaoCarona[]
        return resultado;
    }
}
