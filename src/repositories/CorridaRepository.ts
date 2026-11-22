import  db  from "../database/db.js";
import type { Corrida } from "../entities/Corrida.ts"
import type { RowDataPacket } from "mysql2";

interface CorridaRow extends RowDataPacket {
    idCorrida: number,
    data_hora_final: string,
    situacao: string,
    idOferta: number
}
class CorridaRepository {
    public async cadastrarCorrida(idCorrida: number, data_hora_final: string, situacao: string, idOferta: number): Promise<void> {
        const busca = `INSERT INTO CORRIDA (idCorrida, data_hora_final, situacao, idOferta) values (?, ?, ?, ?)`
        const valores = [idCorrida, data_hora_final, situacao, idOferta]

        await db.execute(busca, valores)
    }
    public async buscarPorId(idCorrida: number): Promise<Corrida | null> {
        const busca = `SELECT * FROM CORRIDA WHERE idCorrida = ?`
        const [resultado] = await db.execute<CorridaRow>(busca, [idCorrida])
        const corrida = resultado[0] as Corrida

        return corrida || null
    }
    public async finalizarCorrida(idCorrida: number): Promise<void> {
        const busca = `DELETE FROM CORRIDA WHERE idCorrida = ?`
        const [resultado] = await db.execute(busca, [idCorrida])
        if(!resultado){
            throw new Error("Corrida não encontrada!")
        }
    }
}
