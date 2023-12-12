import CryptoJS from 'crypto-js';

// 加密函数
export function encrypt(payload, keyBase64) {
  const key = CryptoJS.enc.Base64.parse(keyBase64);
  const iv = CryptoJS.lib.WordArray.random(16);  // 生成一个16字节的随机IV
  const encrypted = CryptoJS.AES.encrypt(payload, key, { iv });
  return { data: encrypted.ciphertext.toString(CryptoJS.enc.Hex), iv: iv.toString(CryptoJS.enc.Hex) };
}

// 解密函数
export function decrypt(message, keyBase64) {
  const key = CryptoJS.enc.Base64.parse(keyBase64);
  const iv = CryptoJS.enc.Hex.parse(message.iv);
  const encryptedText = CryptoJS.enc.Hex.parse(message.data);
  const cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: encryptedText,
  });
  const decrypted = CryptoJS.AES.decrypt(cipherParams, key, { iv });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

// 生成密钥
export function getKey() {
  return CryptoJS.lib.WordArray.random(32).toString(CryptoJS.enc.Base64);
}

// 使用基础字符串生成密钥
export function getKeyByBasicString(basicString) {
  const hash = CryptoJS.SHA256(basicString);
  return hash.toString(CryptoJS.enc.Base64);
}

console.debug(getKeyByBasicString('123456'))
