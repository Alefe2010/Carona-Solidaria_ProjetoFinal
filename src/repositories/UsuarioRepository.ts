import db from "../database/db.js"
import { Usuario } from "../entities/Usuario.ts";


export class UsuarioRepository {
    async cadastrarUsuario(usuario: Usuario): Promise<void> {
        const oi = `INSERT INTO USUARIO(CPF, nome, telefone, dataNasc, email) VALUES (?, ?, ?, ?, ?, ?)`;
        const valores = [usuario.CPF, usuario.nome, usuario.telefone, usuario.dataNasc, usuario.email];

        await db.execute(oi, valores);
    }

    async buscarPorId(CPF: string): Promise<Usuario | null> {
        const oi = `SELECT * FROM USUARIO WHERE CPF = ?`;
        const [usuario] = await db.execute(oi, [CPF]);
        const ola = usuario as Usuario[];

        return ola[0] || null
    }   

    async atualizarDados(CPF: string, dados: Usuario): Promise<void> {
        const oi = `UPDATE USUARIO SET nome = ?, telefone = ?, dataNasc = ?, email = ? WHERE CPF = ?`;
        const valores = [dados.nome, dados.telefone, dados.dataNasc, dados.email, CPF];

        await db.execute(oi, valores);
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
}