import { OfertaCarona } from "../entities/OfertaCarona.ts";
import db from "../database/db.js";
import type { Usuario } from "../entities/Usuario.ts";


export class OfertaCaronaRepository {
    constructor(){}

    async cadastrarOferta(numeroVaga: number, origem: string, destino: string, dataHora: string , idUsuario: number, placa:string): Promise<void> {
        const queryCadOferta = 'INSERT INTO ofertaCarona (numeroVaga, origem, destino, cpf) VALUES (?, ?, ?, ?, ?, ?)';
        const valores = [numeroVaga, origem, destino, dataHora, idUsuario, placa];

        await db.execute(queryCadOferta, valores);
    }
    async buscarOfertas(): Promise<OfertaCarona[] | null>{
        const queryBusca = "SELECT v.placa, v.modelo, v.cor, oc.* FROM ofertaCarona AS oc INNER JOIN veiculo AS v ON oc.placa = v.placa";
        const [rows] = await db.execute(queryBusca)
        const ofertas = rows as OfertaCarona[]
        return ofertas || null
    }

    async buscarPorId(idOferta: number): Promise<OfertaCarona | null> {
        const busca = 'SELECT * FROM ofertaCarona WHERE idOferta = ?';
        const [rows] = await db.execute(busca, [idOferta]);
        const ofertas = rows as OfertaCarona[]
        return ofertas[0] ?? null;
    }

    async atualizarDados(id_oferta: number, dados: Record<string, any>): Promise<void> {
        const busca = 'UPDATE OfertaCarona SET numeroVaga = ?, origem = ?, destino = ? WHERE idOferta = ?';
        const valores = [dados.numeroVagas, dados.origem, dados.destino, id_oferta];

        await db.execute(busca, valores);
    }

    public async excluirOferta(idOferta: number): Promise<void> {
        const busca = 'DELETE FROM OfertaCarona WHERE idOferta = ?';
        await db.execute(busca, [idOferta]);
    }

    async filtroOfertas(filtro:Record<string, any>): Promise<OfertaCarona[] | null>{
        let queryFiltroOferta = "SELECT v.placa, v.modelo, v.cor, oc.* FROM ofertaCarona AS oc INNER JOIN veiculo AS v ON oc.placa = v.placa"
        const chaves = Object.keys(filtro)
        const valores = Object.values(filtro)

        if(chaves.length > 0){
            queryFiltroOferta += "WHERE" + chaves.map(chave => `oc.${chave} = ?`).join("AND")
        }

        try {
            const [rows] = await db.execute(queryFiltroOferta, valores)
            const ofertas = rows as OfertaCarona[]
            if(ofertas.length === 0) return null
            return ofertas
        
        } catch (error) {
            throw new Error("deu b.o: " + error)
        }
        

    }
    async buscarOfertasDeUsuario(idUsuario: number): Promise<OfertaCarona[] | null>{

        let queryBuscaOfertasUser = "SELECT * FROM ofertaCarona WHERE CPF = ?"
        const [rows] = await db.execute(queryBuscaOfertasUser, [idUsuario])
        const ofertas = rows as OfertaCarona[]
        return ofertas || null

    }
}