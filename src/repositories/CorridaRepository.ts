import  db  from "../database/db.js";
import type { Corrida } from "../entities/Corrida.ts"

export class CorridaRepository {
    public async cadastrarCorrida( idOferta: number): Promise<void> {
        const busca = `INSERT INTO CORRIDA (idOferta) values (?)`
        const valores = [idOferta]

        await db.execute(busca, valores)
    }
    public async buscarPorId(idCorrida: number): Promise<Corrida | null> {
        const busca = `SELECT * FROM CORRIDA WHERE idCorrida = ?`
        const [resultado] = await db.execute(busca, [idCorrida])
        const linhas = resultado as Corrida[]

        return linhas[0] || null
    }
    public async finalizarCorrida(idCorrida: number): Promise<void> {
        const busca = `DELETE FROM CORRIDA WHERE idCorrida = ?`
        const [resultado] = await db.execute(busca, [idCorrida])
        if(!resultado){
            throw new Error("Corrida não encontrada!")
        }
    }
}
