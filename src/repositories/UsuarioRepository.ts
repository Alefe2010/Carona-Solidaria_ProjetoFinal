import db from "../database/db.js"
import { Usuario } from "../entities/Usuario.ts";


export class UsuarioRepository {
    async cadastrarUsuario(usuario: Usuario): Promise<void> {
        const oi = `INSERT INTO USUARIO(CPF, nome, telefone, dataNasc, email) VALUES (?, ?, ?, ?, ?)`;
        const valores = [ usuario.CPF, usuario.nome, usuario.telefone, usuario.dataNasc, usuario.email];

        await db.execute(oi, valores);
    }

    async buscarPorId(CPF: number): Promise<Usuario> {
        const oi = `SELECT * FROM USUARIO WHERE CPF = ?`;
        const [usuario] = await db.execute(oi, [CPF]);
        const ola = usuario[0] as Usuario;

        return ola || null
    }   

    async atualizarDados(idUsuario: number, dados: Usuario): Promise<void> {
        const oi = `UPDATE USUARIO SET CPF = ?, nome = ?, telefone = ?, dataNasc = ?, email = ? WHERE id = ?`;
        const valores = [dados.CPF, dados.nome, dados.telefone, dados.dataNasc, dados.email, idUsuario];

        await db.execute(oi, valores);
    }

    async excluiUsuario(idUsuario: number): Promise<void> {
        const oi = ` DELETE FROM USUARIO WHERE CPF = ? `;
        await db.execute(oi, [idUsuario]);
    }

    async filtrarMotoristas():Promise<Usuario[]>{
        const motoristas = await db.query(`SELECT * FROM USUARIO WHERE CNH IS NOT NULL`) 
        return motoristas
    }

    async filtrarPassageiros():Promise<Usuario[]>{
        const passageiros = await db.query(`SELECT * FROM USUARIO WHERE CNH IS NULL`)
        return passageiros
    }}