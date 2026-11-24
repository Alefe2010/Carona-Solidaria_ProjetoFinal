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
            { email: usuario.email, senha: usuario.senha ,fone: usuario.telefone },
            process.env.jwt_secret,
            { expiresIn: "10m" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 15 * 60 * 1000 
        });
function logout(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  console.log("Logout realizado com sucesso")
  return res.redirect("/")
  
}

async function signUp(req, res) {
  const {cpf, nome, telefone, email, data_nasc} = req.body;

  try {
    await UsuarioRepository.cadastrarUsuario(cpf,nome, telefone, data_nasc, email,);

    const payload = { id: cpf, email: email };
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1d" });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    return res.status(201).json({ message: "Cadastro concluído" });
    } catch (error) {
        return res.status(500).json({ message: "Problema interno do servidor" });
    }
     
}

export default {login, logout, signUp};
