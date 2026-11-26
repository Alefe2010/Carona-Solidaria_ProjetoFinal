import db from "../database/db.js";
import type { Veiculo } from "../entities/Veiculo.ts";


export class VeiculoRepository {
    constructor(){}

    async cadastrarVeiculo( placa:string, cor:string, modelo: string, qntdAcentos: number, CPF:string): Promise<void> {
        const queryCadOferta = 'INSERT INTO veiculo (placa, cor, modelo, qtd_acentos, CPF) VALUES (?, ?, ?, ?, ?)';
        const valores = [placa, cor, modelo, qntdAcentos, CPF];

        await db.execute(queryCadOferta, valores);
    }
    async buscarVeiculos(): Promise<Veiculo[] | null>{
        const queryBusca = "SELECT * FROM veiculo";
        const [rows] = await db.execute(queryBusca)
        const veiculos = rows as Veiculo[]
        return veiculos || null
    }

    async buscarPorId(placa: string): Promise<Veiculo | null> {
        const busca = 'SELECT * FROM veiculo WHERE placa = ?';
        const [rows] = await db.execute(busca, [placa]);
        const veiculos = rows as Veiculo[]
        return veiculos[0] ?? null;
    }

    async atualizarDados(placa: string, dados: Record<string, any>): Promise<void> {
        
        const chaves = Object.keys(dados)
        const valores = Object.values(dados)
        valores.push(placa)
        
        let busca = 'UPDATE veiculo '
        
        busca += "SET " + chaves.map(chave => `${chave} = ?`).join(",") + " WHERE placa = ?"
        
        await db.execute(busca, valores);


    }

    public async excluirVeiculo(placa: string): Promise<void> {
        const busca = 'DELETE FROM veiculo WHERE placa = ?';
        await db.execute(busca, [placa]);
    }

    async buscarVeiculosUsuario(CPF: string): Promise<Veiculo[] | null>{

        let queryBuscaVeiculoUser = "SELECT * FROM veiculo WHERE CPF = ?"
        const [rows] = await db.execute(queryBuscaVeiculoUser, [CPF])
        const veiculos = rows as Veiculo[]
        return veiculos || null

    }
}