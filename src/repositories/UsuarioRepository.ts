import { db } from "../database/database.ts"
import { Usuario } from "../entities/Usuario.ts";


export class UsuarioRepository {

    async cadastrarUsuario(usuario: Usuario): Promise<void> {

        const oi = `INSERT INTO USUARIO(CPF, nome, telefone, dataNasc, email) VALUES (?, ?, ?, ?, ?)`;

        const valores = [ usuario.CPF, usuario.nome, usuario.telefone, usuario.dataNasc, usuario.email];

        await db.execute(oi, valores);
    }

    async buscarPorId(id_usuario: number): Promise<Usuario> {

        const oi = `SELECT * FROM USUARIO WHERE id = ?`;

        const usuario = await db.execute(oi, [id_usuario]);

        const ola = usuario[0] as Usuario;
        return ola ?? null
    }   

    async atualizarDados(id_usuario: number, dados: Usuario): Promise<void> {

        const oi = `UPDATE USUARIO SET CPF = ?, nome = ?, telefone = ?, dataNasc = ?, email = ? WHERE id = ?`;

        const valores = [dados.CPF, dados.nome, dados.telefone, dados.dataNasc, dados.email, id_usuario];

        await db.execute(oi, valores);
    }

    async excluiUsuario(id_usuario: number): Promise<void> {

        const oi = ` DELETE FROM USUARIO WHERE id = ? `;

    

        await db.execute(oi, [id_usuario]);
    }


    async filtrarMotoristas():Promise<Usuario>{

    }

    async filtrarPassageiros():Promise<Usuario>{


    }}