import * as OTPAuth from "otpauth"
import User from "../models/userModel.js";


export const validateOTP = async (req, res,next) =>{
try{
    const { otp} = req.body;
    const { email} = req.params

    const user = await User.findOne({ email });

    let totp = new OTPAuth.TOTP({
        // Provider or service the account is associated with.
        issuer: "ACME",
        // Account identifier.
        label: "Lexicon",
        // Algorithm used for the HMAC function.
        algorithm: "SHA1",
        // Length of the generated tokens.
        digits: 6,
        // Interval of time for which a token is valid, in seconds.
        period: 120,
        // Arbitrary key encoded in Base32 or OTPAuth.Secret instance.
        secret: user.secretKey, // or 'OTPAuth.Secret.fromBase32("NB2W45DFOIZA")'
});


//VAlidate a token (returns the token delta or null if it is not found in the search window, in which case it should be considered invaild)

let delta = totp.validate({token:otp , window:1});
if (delta === null){
    res.status(401).json({message: "Invaild OTP"})
    
}else{
    next();
}
}catch(error){
    console.log (error.message);
    return res.status(500).json({ message: "An error occurred while trying to validate OTP" });
}
}