import * as OTPAuth from "otpauth"

export const OTPgenrator = async (secretID) => {
    // Create a new TOTP object.
let totp = new OTPAuth.TOTP({
    // Provider or service the account is associated with.
    issuer: "ACME",
    // Account identifier.
    label: label,
    // Algorithm used for the HMAC function.
    algorithm: "SHA1",
    // Length of the generated tokens. 
    digits: 6,
    // Interval of time for which a token is valid, in seconds.
    period: 120,
    // Arbitrary key encoded in Base32 or OTPAuth.Secret instance.
    secret:OTPAuth.Secret.fromBase32(secretID), // or 'OTPAuth.Secret.fromBase32("NB2W45DFOIZA")'
  });

  const token = totp.generate();
  console.log(token)
  return token;
}