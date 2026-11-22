import express from "express"
import jwt from "jsonwebtoken"
import dotenv from "dotenv-safe"
//import UsuarioRepository from "../repository/UsuarioRepository.ts"

dotenv.config()

const login = (req, res) => {
    const {email, senha, fone} = req.body

    console.log(`Email: ${email} | Senha: ${senha} | Telefone: ${fone}`)
    if(email === 'alfagi@gmail.com' && senha === '123456' && fone === '40028922'){
        console.log('logado!')
        const token = jwt.sign(
            {
                id: 10,
                email: "alfagi@email.com"
            },
            process.env.jwt_secret,
            {expiresIn: '3m'}
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 3 * 60 * 1000
        });
        console.log("Token ativo:" + token)
        return res.redirect("/")
    }
    else {
        res.send("Ocorreu algum erro! Preencha todos os campos e tente novamente!")
    }
}
export default login;

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
  const { nome, telefone, email, data_nasc, cpf } = req.body;

  try {
    await UsuarioRepository.cadastrarUsuario(nome, telefone, email, data_nasc, cpf);

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
