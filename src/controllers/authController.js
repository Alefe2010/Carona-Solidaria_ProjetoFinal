import UsuarioRepository from "../repository/UsuarioRepository.ts"

function logout(req, res){
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
