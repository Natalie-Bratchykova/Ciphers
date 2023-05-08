export default class TrithemiusCipher {
  constructor() {}

  static unicodeNumber = 65_535;
  static keyController = 40_000;

  #cipher(text, key, isEncryption, isString) {
    let result = "";
    // if (/^(-?\d+\s)*(-?\d+)$/.test(key)) {
    //   // alert("numbers");
    //   let numberKey = key
    //     .trim()
    //     .split(" ")
    //     .map((num) => parseInt(num));
    //   console.log(key);
    //   result = this.#cipherNumberKey(text, numberKey, isEncryption);
    // } else {
    //   // alert("string");
    //   result = this.#cipherWord(text, key, isEncryption);
    // }

    if (isString) {
      result = this.#cipherWord(text, key, isEncryption);
    } else {
      let numberKey = key
        .trim()
        .split(" ")
        .map((num) => parseInt(num));
      console.log(key);
      result = this.#cipherNumberKey(text, numberKey, isEncryption);
    }
    return result;
  }

  mod(n, m) {
    return ((n % m) + m) % m;
  }

  #cipherNumberKey(text, key, isEncryption) {
    return text
      .split("")
      .map((ch, index) => {
        let countedKey = key.reduce(
          (acc, k, i) => (acc += k * index ** (key.length - i - 1)),
          0
        );
        countedKey = this.mod(countedKey, TrithemiusCipher.keyController);
        if (!isEncryption) countedKey *= -1;
        let code =
          (ch.charCodeAt(0) + TrithemiusCipher.unicodeNumber + countedKey) %
          TrithemiusCipher.unicodeNumber;

        return String.fromCharCode(code);
      })
      .join("");
  }

  // for word
  #cipherWord(text, key, isEncryption) {
    console.log(key);
    let keyArray = key.split("");
    return text
      .split("")
      .map((ch, i) => {
        let keyI = i % keyArray.length;
        let keyCode = isEncryption
          ? keyArray[keyI].charCodeAt(0)
          : keyArray[keyI].charCodeAt(0) * -1;
        return String.fromCharCode(
          parseInt(
            Math.abs(ch.charCodeAt(0) + keyCode) %
              TrithemiusCipher.unicodeNumber
          )
        );
      })
      .join("");
  }

  encrypt(text, key, isString) {
    return this.#cipher(text, key, true, isString);
  }

  decrypt(text, key, isString) {
    return this.#cipher(text, key, false, isString);
  }
}
