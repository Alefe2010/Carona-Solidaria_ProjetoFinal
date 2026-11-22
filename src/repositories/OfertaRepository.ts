import { OfertaCarona } from "../entities/OfertaCarona.ts"; 
import db  from "../database/db.js"

export class OfertaCaronaRepository {

    async cadastrarOferta(numeroVaga: number, origem: string, destino: string, id_usuario: number): Promise<void> {
        const a = 'INSERT INTO OfertaCarona (numeroVaga, origem, destino, id_usuario) VALUES (?, ?, ?, ?)';
        const valores = [numeroVaga, origem, destino, id_usuario];

        await db.execute(a, valores);
    }

    async buscarPorId(idOferta: number): Promise<OfertaCarona | null> {
        const busca = 'SELECT * FROM OfertaCarona WHERE id_oferta = ?';
        const [resultado] = await db.execute(busca, [idOferta]);

        const oferta = resultado[0] as OfertaCarona;

        return oferta || null;
    }

    async atualizarDados(id_oferta: number, dados: OfertaCarona): Promise<void> {
        const busca = 'UPDATE OfertaCarona SET numeroVaga = ?, origem = ?, destino = ? WHERE id_oferta = ?';
        const valores = [dados.numeroVagas, dados.origem, dados.destino, id_oferta];

        await db.execute(busca, valores);
    }

    async excluirOferta(id_oferta: number): Promise<void> {
        const busca = 'DELETE FROM OfertaCarona WHERE id_oferta = ?';
        await db.execute(busca, [id_oferta]);
    }

    async filtrarPorRegiao(regiao: string): Promise<OfertaCarona[]> {
        const busca = 'SELECT * FROM OfertaCarona WHERE origem LIKE ? OR destino LIKE ?';
        const a = [regiao, regiao]
    
        const [resultado] = await db.execute(busca, a);

        return resultado as OfertaCarona[];
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