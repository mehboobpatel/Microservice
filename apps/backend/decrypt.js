const crypto = require("crypto");

const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDOBb7qsTd/WCgt
o9KQOfXIkBIwXJB909GgJ35dtoa4MI1ZuAmu1gwdypwOlFV/seaYXfRBxfSbz0vd
hVnWQEhwToaGvoRgWqkGEZZfKzpcKG4IdshNHdYkxXwCSerwR6I169KmDK5wyFyV
gYnnN8lNzKjUdrjWN35d2w7RZdukHuQpDtALKiuKqq2q8WLIqlPnk8UtjUkwucFe
Z6sy5a8c9DLLHTsq8hymCHwmruuF9LdR82hqi55I8/5eufjHqi2HGLRcCq6cGpFH
rfthXnM98IymYoXHa/Boq67ml4GI3q6+OvtZ17+9Jfu0K9pGDyVRwGMpsWTc7+An
U3+HMy3tAgMBAAECggEBALhGZWTQjF5IAPAJtx4v6YqyasJ9GPSjEL4adSnnSArZ
yqS0O1z5sa63+ewEe5ETE7m3V/G42TjAKxCB5UABEYn6gtNk90yj6sk10/Vd2f5y
XzEM5c4sYM1VIr19VjoDKLDoNOs3LpRMcpt7WVjKCjGfXGdlpaBd1JaoiFF9tP7O
0r7ejywKQ+tidYEuUbbzV879poyTMsJ+ZfHs3V+QsP7CH0j+ZRNfuiuG7frwYTzs
KN8vpsAvrbNlBkfWqhneGFxlVepyjc1YyR3n4BqSHY8by/MdIMmm4qSj8J3uKbMa
osHzg9aHLF6lJM1sj79DOO4B5iZqAUy/8teurfXZ2WECgYEA9yPOfccw8sE1wDWG
JldOZAPvD408spVKGE4woRNI3/u/3abe+U/JSYOOAJJH6Xv6/tRMhPN9dvmJX9p/
J520USnrsbsmMVvGlhUW30eWETtzntMLSYHqrU9h/MypbsWYVpFmtWc7/53ERPFY
AFp1ouQ2BJv1pN/AHZFi2+UVHAkCgYEA1WiSo2NCFGoIOFgnuEpmM3T0gRsA0xgS
ELrrm7TBh8JbfjFOjQioXJPeGs/r0VE8ydX1XfuWt0YuW5uEDPYhOddmy6WGKU5B
veoNJn4fSgzkuT/Y9W6vPi7zcDWzrUpDU8rR1BqOE8f6nsUFzElnDNljjZmW8c+Y
sBegKYq8g8UCgYAo8RSfP6V7QcjOy88qgOIqrYAoGmTIzPSWbDWgKZq0CHezl5Zu
xOn6tMGMlK83HePp3W/DwraxRAufBop0HKsnmwNB0Vg1axfN+zZrzOcueaPg1uOS
zOP8zB7Wi20yPafMB5B1UuHcqd0+8qB6hoHgd1//iXq7Upn4DALNnPjPSQKBgQDU
hqnSER1TmyzIf/I+c8lH4WdF05CEqOoEw0Gz9NTu0D2xdIUXqtGQMKn15a6g69gv
4OXUTKMRrdCo5j0hc1QveDYlBJiRNh/+c8HY3a1nX2PAoLb95NachMFms/RV1Skr
n0ZLho6LYJJT3z4g7dC0WSHteFF8SxNx+nVEKagHSQKBgQD2MiVUYxQovoku8Ihq
zps2z2Ok1SIclfTz23QyakLIBqqZtKz4+AcCU8Zr8+1db/p23aWaKg4IT/0fCVev
EwVSW7vCrgo6sIqVEL7YYWYoKBe//czG3stK9lE0tpofZ8sFs6T04YxCYTOV2url
+kG85paWx4ijsjw1X4HgxAiGZA==
-----END PRIVATE KEY-----`;

function decryptMessage(privateKey, encryptedMessage) {
  try {
    // Convert base64 encrypted string to Buffer
    const encryptedBuffer = Buffer.from(encryptedMessage, "base64");
    const decryptedData = crypto.privateDecrypt(
      {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256",
      },
      encryptedBuffer
    );
    // Return decrypted message as string
    return decryptedData.toString("utf8");
  } catch (error) {
    throw new Error(`Decryption failed: ${error.message}`);
  }
}

console.log(
  decryptMessage(
    privateKey,
    "groZGee9A/e5pLCfvzb+8SaDX3xU52aY/w5xw42YFhX6XHFYLd9daYjv1w574AY/R+GMC3kni7jEQTNegloUTPb79MxoDyJ9R8rr888BEHrJL9ijqH4tiP4/1Vp3tqXMznBetnE3mbavC3ePGSHNbBzt1yr17R+Kp1Wi9wVxmpzoT+i9zUE2hR5OpMDQK1Y9kwLuWZmk9xDQJXSElo5tahRNx5lcrUrM6KrTVeG7PPuOgwBKixQ3xQ6TgohW9hQ+kKwpyGVwupjFnz122227uqUf/TrC1YheWxiyFOfvKp1FJWDfeg5Oi+ptNrNnsgSw8+mH9AQC8MPbQSGjesDbbQ=="
  )
);
