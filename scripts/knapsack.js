// bag task
// cypher method
export default class Knapsack {
  constructor() {}
  // generate public key
  checkSequence(Bsequence) {
    let sum = Bsequence[0];
    console.log(Bsequence);
    let isSuperIncreasing = false;
    for (let i = 1; i < Bsequence.length; i++) {
      if (Bsequence[i] > sum) {
        sum += Bsequence[i];
        isSuperIncreasing = true;
      } else {
        alert("Ця послідовність не є суперзростаючою");
        return;
      }
    }
    return isSuperIncreasing;
  }

  generatePrivateKey(keyLength, firstElement) {
    let privateKey = [];
    privateKey.push(firstElement);
    for (let i = 1; i < keyLength; i++) {
      privateKey.push(privateKey[i - 1] * 2);
    }
    return privateKey;
  }

  generateNumberWithGCDOne(knownNumber) {
    function isRelativelyPrime(num1, num2) {
      return gcd(num1, num2) === 1;
    }

    function gcd(a, b) {
      if (b === 0) {
        return a;
      }
      return gcd(b, a % b);
    }

    var randomNumber;
    do {
      randomNumber = Math.floor(Math.random() * knownNumber);
    } while (!isRelativelyPrime(randomNumber, knownNumber));

    return randomNumber;
  }

  generateKeysAutomatically() {
    let keyLength = Math.round(Math.random() * 10) + 3;
    let startOfSequence = Math.round(Math.random() * 10) + 1;
    let privateKey = [];
    privateKey.push(startOfSequence);
    //let sum = 0;
    for (let i = 1; i < keyLength; i++) {
      privateKey.push(privateKey[i - 1] * 2);
    }
    let m = privateKey.reduce((acc, el) => (acc += el), 0);
    m += Math.round(Math.random() * 80);

    let n = this.generateNumberWithGCDOne(m);

    let publicKey = this.generatePublicKey(privateKey, m, n);
    return {
      privateKey: privateKey,
      m: m,
      n: n,
      publicKey: publicKey,
    };
  }

  generatePublicKey(BSequence, module, n) {
    let publickKey = "";
    if (this.checkSequence(BSequence)) {
      // check module
      let sequenseSum = BSequence.reduce((acc, elem) => (acc += elem), 0);
      if (module < sequenseSum) {
        alert(
          `ПОМИЛКА!!! Число m(${module}) менша за суму послідовності(${sequenseSum})`
        );
        return;
      }

      // key generation
      let t = n % module;
      publickKey = BSequence.map((elem) => (elem * t) % module);
    }
    return publickKey;
  }

  encrypt(text, publicKey) {
    text = text
      .split("")
      .map((e) => e.charCodeAt(0).toString(2))
      .map((e) => {
        if (e.length < 20) {
          let padding = "";
          while (padding.length < 20 - e.length) {
            padding += "0";
          }
          e = padding + e;
        }
        return e;
      })
      .join(",");
    // divide text into blocks
    let textForDivision = text.replaceAll(",", "");
    let cipherText = [];
    for (let i = 0; i < textForDivision.length; i += publicKey.length) {
      let block = textForDivision.substring(i, i + publicKey.length);
      let sum = block
        .split("")
        .reduce((acc, el, index) => (acc += Number(el) * publicKey[index]), 0);
      cipherText.push(sum);
    }

    return cipherText.join(",");
  }

  // get  inverse num
  multiplicativeInverse(n, m) {
    let a = n,
      b = m;
    let [x, y, u, v] = [0, 1, 1, 0];

    while (a !== 0) {
      let q = Math.floor(b / a);
      let r = b % a;
      let [m, n] = [x - u * q, y - v * q];
      [b, a] = [a, r];
      [x, y] = [u, v];
      [u, v] = [m, n];
    }

    let gcd = b;
    let inverse = x % m;
    if (inverse < 0) {
      inverse += m;
    }

    if (gcd !== 1) {
      throw new Error("Multiplicative inverse does not exist");
    } else {
      return inverse;
    }
  }

  packKnapsack(array, weight) {
    let key = [...array];
    let sum = 0;
    for (let i = key.length - 1; i >= 0; i--) {
      sum += key[i];
      if (sum <= weight) {
        key[i] = 1;
      } else {
        sum -= key[i];
        key[i] = 0;
      }
    }
    return key;
  }

  decrypt(text, privateKey, module, n) {
    let key = privateKey;
    text = text.split(",").map((e) => Number(e));
    let decryptN = this.multiplicativeInverse(n, module);
    text = text
      .map((el) => this.packKnapsack(key, (el * decryptN) % module))
      .join("")
      .replaceAll(",", "");
    let decryptedText = [];
    for (let i = 0; i < text.length; i += 20) {
      let bite = text.substring(i, i + 20);
      decryptedText.push(parseInt(bite, 2));
    }
    decryptedText = decryptedText.map((el) => String.fromCharCode(el));
    return decryptedText.join("");
  }

  gcd(a, b) {
    // Ensure a is greater than or equal to b
    if (b > a) {
      [a, b] = [b, a];
    }

    // Euclidean algorithm to find the GCD
    while (b !== 0) {
      let remainder = a % b;
      a = b;
      b = remainder;
    }

    return a;
  }

  hasOnlyOneGCD(num1, num2) {
    let greatestCommonDivisor = this.gcd(num1, num2);

    // If the GCD is 1, there is only one GCD
    if (greatestCommonDivisor === 1) {
      return true;
    } else {
      return false;
    }
  }
}
