import express from "express"
import jwt from "jsonwebtoken"
import dotenv from "dotenv-safe"

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
}
export default login;
