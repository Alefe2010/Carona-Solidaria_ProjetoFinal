import { OfertaCarona } from "../entities/OfertaCarona.ts"; 
import db from "../database/db.js"
import type { Motorista } from "../entities/Motorista.ts";

export class OfertaCaronaRepository {
    public async cadastrarOferta(idOferta: number, numeroVaga: number,  horario: string, origem: string, destino: string, motorista: Motorista): Promise<void> {
        const a = 'INSERT INTO OfertaCarona (idOferta, numeroVaga, horario, origem, destino, motorista) VALUES (?, ?, ?, ?, ?, ?)';
        const valores = [idOferta, numeroVaga, horario, origem, destino, motorista];

        await db.execute(a, valores);
    }

    public async buscarPorId(idOferta: number): Promise<OfertaCarona | null> {
        const busca = 'SELECT * FROM OfertaCarona WHERE id_oferta = ?';
        const [resultado] = await db.execute(busca, [idOferta]);

        const linhas = resultado as OfertaCarona[];

        return linhas[0] || null;
    }

    public async atualizarDados(idOferta: number, dados: Partial< OfertaCarona>): Promise<void> {
        const busca = 'UPDATE OfertaCarona SET numeroVaga = ?, origem = ?, destino = ? WHERE id_oferta = ?';
        const valores = [dados.numeroVagas, dados.origem, dados.destino, idOferta];

        await db.execute(busca, valores);
    }

    public async excluirOferta(idOferta: number): Promise<void> {
        const busca = 'DELETE FROM OfertaCarona WHERE idOferta = ?';
        await db.execute(busca, [idOferta]);
    }

    public async filtrarPorRegiao(regiao: string): Promise<OfertaCarona[]> {
        const busca = 'SELECT * FROM OfertaCarona WHERE origem LIKE ? OR destino LIKE ?';
        const a = [regiao, regiao]
    
        const [resultado] = await db.execute(busca, a);

        return resultado as OfertaCarona[];
    }

    public async filtrarPorDestino(destino: string): Promise<OfertaCarona[]> {
        const busca = 'SELECT * FROM OfertaCarona WHERE destino LIKE ?';
        const [resultado] = await db.execute(busca, [destino]);

        return resultado as OfertaCarona[];
    }
}