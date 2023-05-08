// bound = 2147483647
function* pseudoRandom(seed) {
  let value = seed;
  while (true) {
    value = (value * 16807) % (0x10ffff + 1);
    yield value;
  }
}
function hashCode(string) {
  let hash = 0;
  if (string.length == 0) return hash;
  for (let i = 0; i < string.length; i++) {
    // hash << 5 === hash *32
    hash = (hash << 5) - hash + string.charCodeAt(i);
    // check if hash value doesn't go out of range (int32)
    hash = hash & hash;
  }
  return hash;
}
export default class XorEncryption {
  constructor() {}
  #maxLength = 65_535;

  generateGamma(key, text) {
    let length = text.length + Math.random() * 1000;
    let seed = hashCode(key);
    let generator = pseudoRandom(seed);
    let sb = "";

    for (let i = 0; i < length; i++) {
      let curseed = generator.next().value;
      sb += String.fromCharCode(curseed);
    }
    return sb;
  }

  doCipher(text, gamma) {
    return text
      .split("")
      .map((ch, index) => {
        return String.fromCharCode(ch.charCodeAt(0) ^ gamma.charCodeAt(index));
      })
      .join("");
  }

  // decrypt
}

