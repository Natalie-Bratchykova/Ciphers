export default class CaesarCipher {
  constructor() {}

  cipher(text, key) {
    return text
      .split("")
      .map((ch) => {
        return String.fromCharCode(parseInt(ch.charCodeAt(0) + key));
      })
      .join("");
  }

  encrypt(text, key) {
    return this.cipher(text, key);
  }

  decrypt(text, key) {
    return this.cipher(text, -key);
  }
}
