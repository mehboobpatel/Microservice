const crypto = require("crypto");

const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsjreur7R/B+3ZyjeijQB
+wrvMl08h/BoIBC+JF3KCNwQhdl2uFXcSNVY9NNEnsv/c7gaJaSyI2FH0JxQ7kex
zoWqpAWslFgsGIn9znBS3zWlFMLLN0eEBlCTFtTuwXgueC2XBRBjcct2DStVesbg
mNkcwZRD7L9Xwp8/7juhBgqUbeu9lqFxCqoXP0aWuLj6DDRrv2s9mLnk3s4Rqr9k
ikfgdrsIa1gJy8tQkIfNR0SbUfYIKCsFcV83CoI0E51ntrIzAQlAUNJfIz4XNa9C
AcY/s0KFvAYnT3+jIhjNiKhWOOIeTqsHQG7jhpjaFEHQw5eAXqWao2GXnAELU83X
FwIDAQAB
-----END PUBLIC KEY-----`

function encryptMessage(publicKey, message) {
    try {
      const encryptedData = crypto.publicEncrypt(
        {
          key: publicKey,
          padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
          oaepHash: "sha256",
        },
        Buffer.from(message, "utf8")
      );
      return encryptedData.toString("base64");
    } catch (error) {
      throw new Error(`Encryption failed: ${error.message}`);
    }
  }

const message = "admin123";
const encryptedMessage = encryptMessage(publicKey, message);
console.log("Encrypted Message:\n", encryptedMessage);