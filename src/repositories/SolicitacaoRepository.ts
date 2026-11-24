import  Solicitacao  from "../entities/SolicitacaoCarona.ts";
import  db  from "../database/db.js"

export class SolicitacaoRepository {
    public async cadastrarSolicitacao(qtdVaga: number, horario: string, id_usuario: number): Promise<void> {
        const oi = `INSERT INTO SOLICITACAO (qtdVaga, horario, id_usuario) VALUES (?, ?, ?)`;
        const valores = [qtdVaga, horario, id_usuario];

        await db.execute(oi, valores);
    }

    public async buscarPorId(id_solicitacao: number): Promise<Solicitacao | null> {
        const busca = `SELECT * FROM SOLICITACAO WHERE id_solicitacao = ?`;
        const [resultado] = await db.execute(busca, [id_solicitacao]);
        const linhas = resultado as Solicitacao[];

        return linhas[0] || null;
    }

    public async atualizarDados(id_solicitacao: number, dados: Solicitacao): Promise<void> {
        const oi = `UPDATE SOLICITACAO SET qtdVaga = ?, horario = ? WHERE id_solicitacao = ?`;
        const valores = [dados.qtdVaga, dados.horario, id_solicitacao];

        await db.execute(oi, valores);
    }

    public async excluirSolicitacao(id_solicitacao: number): Promise<void> {
        const oi = `DELETE FROM SOLICITACAO WHERE id_solicitacao = ?`;
        
        await db.execute(oi, [id_solicitacao]);
    }

    public async filtrarQuantidadeVaga(qtdVaga: number): Promise<Solicitacao[]> {
        const busca = `SELECT * FROM SOLICITACAO WHERE qtdVaga = ?`;
        const [resultado] = await db.execute(busca, [qtdVaga]);

        return resultado as Solicitacao[];
    }

    public async filtrarPorHorario(horario: string): Promise<Solicitacao[]> {
        const busca = `SELECT * FROM SOLICITACAO WHERE horario = ?`;
        const [resultado] = await db.execute(busca, [horario]);

        return resultado as Solicitacao[];
    }
}
