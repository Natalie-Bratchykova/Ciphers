export default class DES {
  constructor() {}
  generateIV() {
    return CryptoJS.lib.WordArray.random(8);
  }

  // encryption
  encrypt(text, key, mode) {
    let iv = this.generateIV().toString();
    let encryptedText = CryptoJS.DES.encrypt(text, key, {
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
    return CryptoJS.DES.decrypt(encryptedText, key, {
      iv: CryptoJS.enc.Base64.parse(iv),
      mode: CryptoJS.mode[mode],
      padding: CryptoJS.pad.Iso10126,
    }).toString(CryptoJS.enc.Utf8);
  }
}
