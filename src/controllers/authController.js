import jwt from "jsonwebtoken"
import dotenv from "dotenv-safe"
import { UsuarioService } from "../services/UsuarioService.ts"
import { UsuarioRepository } from "../repositories/UsuarioRepository.ts"


dotenv.config()

async function login(req, res){
    try {
        const {email, senha, fone} = req.body

        if (!email || !senha) {
            return res.status(400).json({ erro: "E-mail e senha são obrigatórios!" });
        }
        const usuarioRepo = new UsuarioRepository()
        const usuarioService = new UsuarioService(usuarioRepo)
        const usuario = await usuarioService.buscarPorEmail(email);

        if (!usuario) {
            return res.status(401).json({ erro: "E-mail ou senha inválidos!" });
        }
        const senhaValida = senha === usuario.senha  

        if (!senhaValida) {
            return res.status(401).json({ erro: "E-mail ou senha inválidos!" });
        }

        const token = jwt.sign(
            { email: usuario.email, senha: usuario.senha ,fone: usuario.telefone },
            process.env.jwt_secret,
            { expiresIn: "10m" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.jwt_secret === "production",
            maxAge: 15 * 60 * 1000 
        });
        console.log("Logado!");
        return res.status(200).redirect("/offer")
    } catch(error){
        console.error("Erro no login:", error);
        return res.status(500).json({ erro: "Erro interno ao tentar fazer login." });
    }
}
function logout(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.jwt_secret === "production",
    sameSite: "lax",
  });
  console.log("Logout realizado com sucesso")
  return res.redirect("/")
  
}

async function signUp(req, res) {
console.log(">>> CHEGOU NO NOVO SIGNUP! Body recebido:", req.body);
  try {
    const {cpf, nome, telefone, data_nasc, email, senha, cnh} = req.body;
    const usuarioRepo = new UsuarioRepository();
    const usuarioService = new UsuarioService(usuarioRepo);
    await usuarioService.cadastrarUsuario(
        cpf,
        nome,
        telefone, 
        data_nasc, 
        email, 
        senha, 
        cnh || null
    );
    const payload = { cpf: cpf, email: email };
    const token = jwt.sign(payload, process.env.jwt_secret, { expiresIn: "1d" });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.jwt_secret === "production",
      sameSite: "lax",
    });
    return res.status(201).json({ message: "Cadastro concluído" });
    } catch (error) {
       /* console.error("Erro no signUp:", error);
        const status = error.statusCode || 500;
        const message = error.statusCode ? error.message : "Problema interno do servidor";
        return res.status(status).json({ message }); */
        console.error("DETALHE DO ERRO 500:", error);
        return res.status(500).json({ message: error.message });
    }
     
}

export default {login, logout, signUp};
