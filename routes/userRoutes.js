import express from "express"
import { createUser, getAllUsers, userLogin } from "../controllers/userController.js"
import { verifyJWToken } from "../middlewares/jwtAuth.js"

const router = express.Router()

router.post("/register", createUser)

router.post("/signIn", userLogin)

router.get("/all",verifyJWToken, getAllUsers)

export default router