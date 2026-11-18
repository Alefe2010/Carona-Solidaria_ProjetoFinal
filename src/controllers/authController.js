const UsuarioRepository = require("../repositories/UsuarioRepository")

function logout(req, res){
    res.clearCookie("token")
    res.status(200).json({message: "Logout realizado!"})
}

async function signUp (req, res){
    const {nome, telefone, email, data_nasc, cpf} = req.body;
    const usuarioRepo = new UsuarioRepository()
    try{
        await usuarioRepo.cadastrarUsuario(nome, telefone, email, data_nasc, cpf)
    }catch(error){
        res.status(500).send("Problema interno do servidor")
    }
    const payload = {nome: nome, telefone: telefone, email: email, data_nasc: data_nasc, cpf: cpf}
    const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "1d"})
    res.cookies("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "development",
        sameSite: "lax",
    })
    res.status(200).json({message: "Cadastro concluído", token: token})


}
