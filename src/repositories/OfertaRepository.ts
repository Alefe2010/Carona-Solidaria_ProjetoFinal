import { OfertaCarona } from "../entities/OfertaCarona.ts";
import db from "../database/db.js";


export class OfertaCaronaRepository {
    constructor(){}

    async cadastrarOferta(numeroVaga: number, origem: string, destino: string, dataHora: Date , cpf: string): Promise<void> {
        const queryCadOferta = 'INSERT INTO OfertaCarona (numeroVaga, origem, destino, cpf) VALUES (?, ?, ?, ?, ?)';
        const valores = [numeroVaga, origem, destino, dataHora,cpf];

        await db.execute(queryCadOferta, valores);
    }

    async buscarPorId(idOferta: number): Promise<OfertaCarona> {
        const busca = 'SELECT * FROM OfertaCarona WHERE idOferta = ?';
        const [rows] = await db.execute(busca, [idOferta]);
        return rows;
    }

    async atualizarDados(id_oferta: number, dados: OfertaCarona): Promise<void> {
        const busca = 'UPDATE OfertaCarona SET numeroVaga = ?, origem = ?, destino = ? WHERE idOferta = ?';
        const valores = [dados.numeroVagas, dados.origem, dados.destino, id_oferta];

        await db.execute(busca, valores);
    }

    async excluirOferta(id_oferta: number): Promise<void> {
        const busca = 'DELETE FROM OfertaCarona WHERE idOferta = ?';
        await db.execute(busca, [id_oferta]);
    }

    async filtrarPorRegiao(regiao: string): Promise<OfertaCarona[]> {
        const busca = 'SELECT * FROM OfertaCarona WHERE origem LIKE ? OR destino LIKE ?';
        
        const a = [regiao, regiao]
    
        const resultado = await db.execute(busca, a);

        return resultado as OfertaCarona;
    }

    async filtrarPorCarro(id_carro: number): Promise<OfertaCarona[]> {
        const busca = 'SELECT * FROM OfertaCarona WHERE id_carro = ?';
        const resultado = await db.execute(busca, [id_carro]);

        return resultado as OfertaCarona[];
    }

    async filtrarPorDestino(destino: string): Promise<OfertaCarona[]> {
        const busca = 'SELECT * FROM OfertaCarona WHERE destino LIKE ?';
        const resultado = await db.execute(busca, [destino]);

        return resultado as OfertaCarona[];
    }
}