import express from "express"
import { createUser, getAllUsers, updatePassword, userLogin } from "../controllers/userController.js"
import { verifyJWToken } from "../middlewares/jwtAuth.js"

const router = express.Router()

router.post("/register", createUser)

router.post("/signIn", userLogin)

router.get("/all",verifyJWToken, getAllUsers)

router.patch("/changePassword/:userName",  updatePassword)

export default router