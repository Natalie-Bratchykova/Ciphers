import DES from "./des.js";
export default class AES extends DES {
  constructor() {
    super();
  }

  encrypt(text, key, mode) {
    let iv = this.generateIV().toString();
    let encryptedText = CryptoJS.AES.encrypt(text, key, {
      iv: iv,
      mode: CryptoJS.mode[mode],
      padding: CryptoJS.pad.Iso10126,
    });
    return {
      iv: iv.toString(CryptoJS.enc.Base64),
      encryptedText: encryptedText.toString(),
    };
  }

  decrypt(encryptedText, key, mode, iv) {
    return CryptoJS.AES.decrypt(encryptedText, key, {
      iv: CryptoJS.enc.Base64.parse(iv),
      mode: CryptoJS.mode[mode],
      padding: CryptoJS.pad.Iso10126,
    }).toString(CryptoJS.enc.Utf8);
  }
}
