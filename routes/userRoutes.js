import express from "express"
import { createUser, getAllUsers, login_otp, sendOtp, updatePassword, updatePasswordOtp, updateUserName, userLogin } from "../controllers/userController.js"
import { verifyJWToken } from "../middlewares/jwtAuth.js"
import { validateOTP } from "../middlewares/validateOTP.js"

const router = express.Router()

router.post("/register", createUser)

router.post("/signIn", userLogin)

// router.get("/all",verifyJWToken, getAllUsers)
router.get("/all", getAllUsers)

router.patch("/changePassword/:userName",   updatePassword);
router.patch("/changeUserName/:userName",  updateUserName);
router.patch("/send-otp",  sendOtp)
router.post("/login-otp", validateOTP, login_otp);
router.patch("/forgot-password/:email", verifyJWToken, updatePasswordOtp)


export default router