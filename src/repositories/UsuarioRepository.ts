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

    async excluiUsuario(CPF: string): Promise<void> {
        const oi = ` DELETE FROM USUARIO WHERE CPF = ? `;
        await db.execute(oi, [CPF]);
    }

    async filtrarMotoristas():Promise<Usuario[]>{
        const [motoristas] = await db.query(`SELECT * FROM USUARIO WHERE CNH IS NOT NULL`)
        const filtrados = motoristas as Usuario[] 
        return filtrados
    }

    async filtrarPassageiros():Promise<Usuario[]>{
        const [passageiros]= await db.query(`SELECT * FROM USUARIO WHERE CNH IS NULL`)
        const filtrados = passageiros as Usuario[] 
        return filtrados
    }

    async buscarPorEmail(email:string): Promise<Usuario | null>{
        const queryEmail = "SELECT * FROM usuario WHERE email = ?"
        const [rows] = await db.execute(queryEmail, [email])
        const usuarios = rows as Usuario[]
        return usuarios[0] || null
    }
}