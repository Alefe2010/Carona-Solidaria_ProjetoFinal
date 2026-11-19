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

/**function logout(req, res){
    res.clearCookie("token")
    res.status(200).json({message: "Logout realizado!"})
}

async function signUp (req, res){
    const {nome, telefone, email, data_nasc, cpf} = req.body;
    try{
        const user = await UsuarioRepository.cadastrarUsuario(nome, telefone, email, data_nasc, cpf)
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
    res.status(200).json({message: "Cadastro concluído", token: token})


}
 */