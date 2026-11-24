import jwt from "jsonwebtoken"
import dotenv from "dotenv-safe"
import { UsuarioService } from "../services/UsuarioService.ts"

dotenv.config()

async function login(req, res){
    try {
        const {email, senha, fone} = req.body

        if (!email || !senha || !fone) {
            return res.status(400).json({ erro: "E-mail e senha são obrigatórios!" });
        }
        const usuario = await this.usuarioService.buscarPorEmail(email);

        if (!usuario) {
            return res.status(401).json({ erro: "E-mail ou senha inválidos!" });
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return res.status(401).json({ erro: "E-mail ou senha inválidos!" });
        }

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email, fone: usuario.telefone },
            process.env.jwt_secret,
            { expiresIn: "10m" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 15 * 60 * 1000 
        });

        return res.status(200).json({ mensagem: "Login realizado com sucesso!" });

    } catch (error) {
        return res.status(500).json({ erro: "Erro interno ao tentar fazer login." });
    }
     
}

function logout (req, res){
    res.clearCookie("token")
    res.status(200).json({message: "Logout realizado!"})
}

async function signUp (req, res){
    const {cpf, nome, telefone, email, data_nasc, } = req.body;
    try{
        await UsuarioService.cadastrarUsuario(cpf, nome, telefone, email, data_nasc)
    }catch(error){
        return res.status(500).send("Problema interno do servidor")
    }

    const payload = {id: user.cpf, email: user.email}
    const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "1d"})
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    })
    return res.status(200).json({message: "Cadastro concluído", token: token})
}

export default {login, logout, signUp};