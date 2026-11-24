import { OfertaCarona } from "../entities/OfertaCarona.ts";
import db from "../database/db.js";
import type { promises } from "node:dns";


export class OfertaCaronaRepository {
    constructor(){}

    async cadastrarOferta(numeroVaga: number, origem: string, destino: string, dataHora: Date , cpf: string): Promise<void> {
        const queryCadOferta = 'INSERT INTO OfertaCarona (numeroVaga, origem, destino, cpf) VALUES (?, ?, ?, ?, ?)';
        const valores = [numeroVaga, origem, destino, dataHora,cpf];

        await db.execute(queryCadOferta, valores);
    }

    async buscarPorId(idOferta: number): Promise<OfertaCarona | null> {
        const busca = 'SELECT * FROM OfertaCarona WHERE idOferta = ?';
        const [rows] = await db.execute(busca, [idOferta]);
        const ofertas = rows as OfertaCarona[]
        return ofertas[0] ?? null;
    }

    async atualizarDados(id_oferta: number, dados: Record<string, any>): Promise<void> {
        const busca = 'UPDATE OfertaCarona SET numeroVaga = ?, origem = ?, destino = ? WHERE idOferta = ?';
        const valores = [dados.numeroVagas, dados.origem, dados.destino, id_oferta];

        await db.execute(busca, valores);
    }

    async excluirOferta(idOferta: number): Promise<void> {
        const busca = 'DELETE FROM OfertaCarona WHERE idOferta = ?';
        await db.execute(busca, [idOferta]);
    }

    async filtroOfertas(filtro:Record<string, any>): Promise<OfertaCarona[] | null>{
        let queryFiltroOferta = "SELECT * FROM oferta"
        const chaves = Object.keys(filtro)
        const valores = Object.values(filtro)

        if(chaves.length > 0){
            queryFiltroOferta += "WHERE" + chaves.map(chave => `${chave} = ?`).join("AND")
        }

        try {
            const [rows] = await db.execute(queryFiltroOferta, valores)
            const ofertas = rows as OfertaCarona[]
            return ofertas ?? null
        
        } catch (error) {
            throw new Error("deu b.o: " + error)
        }
        

    }
}