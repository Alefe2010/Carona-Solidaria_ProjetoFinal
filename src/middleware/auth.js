import jwt from "jsonwebtoken"

function autenticarToken(req, res, next){
    const token = req.cookies.token

    if(!token){
        console.log("Sem token")
        return res.redirect("/auth")
    }
    jwt.verify(token, process.env.jwt_secret, (err, decoded)=> {
        if (err){
            console.log("Token inválido!")
            return res.status(401)
        }
        next()
    })
}

export default autenticarToken;