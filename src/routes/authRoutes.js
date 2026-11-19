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
router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "login.html"))
})
router.post("/login", authController)

export default router;