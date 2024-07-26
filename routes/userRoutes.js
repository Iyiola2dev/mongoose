import express from "express"
import { createUser, getAllUsers, login_otp, sendOtp, updatePassword, updatePasswordOtp, updateUserName, userLogin } from "../controllers/userController.js"
import { verifyJWToken } from "../middlewares/jwtAuth.js"
import { validateOTP } from "../middlewares/validateOTP.js"
import { authorizeRole } from "../middlewares/authorizeRole.js"

const router = express.Router()



router.post("/signIn", userLogin)

// router.get("/all",verifyJWToken, getAllUsers)
router.get("/all",verifyJWToken, authorizeRole(["staff", "admin"]), getAllUsers)
router.post("/:role?/register", createUser)
router.patch("/changePassword/:userName", verifyJWToken,   updatePassword);
router.patch("/changeUserName/:userName", verifyJWToken,  updateUserName);
router.patch("/send-otp",  sendOtp)
router.post("/login-otp", validateOTP, login_otp);
router.patch("/forgot-password-otp/:email", verifyJWToken, updatePasswordOtp)


export default router