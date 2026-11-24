import type { promises } from "node:dns";
import db  from "../database/db.js"
import { Usuario } from "../entities/Usuario.ts";
import type { RowDataPacket } from "mysql2";


export class UsuarioRepository {
    constructor(){}
    async cadastrarUsuario(CPF: string, nome: string, telefone: string, dataNasc: string, email: string): Promise<void> {

        const cadastroUsuarioQuery = `INSERT INTO USUARIO(CPF, nome, telefone, dataNasc, email) VALUES (?, ?, ?, ?, ?)`;

        const valores = [CPF, nome, telefone, dataNasc, email];

        await db.execute(cadastroUsuarioQuery, valores);
    }

    async buscarPorCPF(cpf: string): Promise<Usuario | null> {

        const queryBuscaUsuario = `SELECT * FROM USUARIO WHERE CPF = ?`;

        const [row] = await db.execute(queryBuscaUsuario, [cpf]);
        const usuarios = row as Usuario[]
        
        return usuarios[0] ?? null

    }   

    async atualizarDados(cpf: string, dados: Record<string, any>): Promise<void> {

        const queryAtualizaDadosUser = `UPDATE USUARIO SET nome = ?, telefone = ?, dataNasc = ?, email = ? WHERE CPF = ?`;

        const valores = [dados.nome, dados.telefone, dados.dataNasc, dados.email, cpf];

        await db.execute(queryAtualizaDadosUser, valores);
    }

    async excluiUsuario(cpf: string): Promise<void> {

        const queryExcluirUsuario = ` DELETE FROM USUARIO WHERE id = ? `;

        await db.execute(queryExcluirUsuario, [cpf]);
    }
    async filtrarMotoristas(): Promise<Usuario[]>{
        const queryFiltrarMotorista = "SELECT * FROM USUARIO WHERE cnh IS NOT NULL"
        const [row] = await db.execute(queryFiltrarMotorista)
        return row as Usuario[]
    }
    async filtrarPassageiros(): Promise<Usuario[]>{
        const queryFiltrarPassgeiros = "SELECT * FROM USUARIO WHERE cnh IS NULL"
        const [row] = await db.execute(queryFiltrarPassgeiros)
        return row as Usuario[]
    }
    async buscarPorEmail(email:string){
        if(!email){throw new Error("Dado inválido! Forneça um emial")}
        const queryFiltroEmail = "SELECT * FROM USUARIO WHERE email = ?"
        const [row]= await db.execute(queryFiltroEmail, [email])
        const usuarios = row as Usuario[]
        return usuarios[0] ?? null
    }
}