import express from "express"
const router = express.Router()
import authController from "../controllers/authController.js"
import { fileURLToPath } from "url";
import path from "path"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


router.get("/",  (req, res) => {
<<<<<<< HEAD
    res.sendFile(path.join(__dirname,"..", "views", "login.html"))
=======
    res.sendFile(path.join(__dirname,"..", "views", "tela_inicio.html"))
})
router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "login.html"))
>>>>>>> 13883aa (criei uma página de início e relacionei com a página de login)
})
router.post("/login", authController)

export default router;