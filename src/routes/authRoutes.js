import express from "express"
const router = express.Router()
import authController from "../controllers/authController.js"
import { fileURLToPath } from "url";
import path from "path"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


router.get("/",  (req, res) => {
    res.sendFile(path.join(__dirname,"..", "views", "tela_inicio.html"))
})

//----- Login -----
router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "login.html"))
})
router.post("/login", (req, res) => authController.login(req, res) )

//----- Cadastro -----
router.get("/signin", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "cadastro.html"))
})
router.post("/signin", (req, res) => authController.signUp(req, res))

// ----- Sair -----
router.get("/logout", (req, res) => authController.logout(req, res));


export default router;
