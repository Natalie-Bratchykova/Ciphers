export default class RSA {
  constructor() {
    this.rsa = new JSEncrypt({ default_key_size: 2048 });
  }

  generateKeys() {
    return {
      publicKey: this.rsa.getPublicKey(),
      privateKey: this.rsa.getPrivateKey(),
    };
  }

  encrypt(text, publicKey) {
    this.rsa.setPublicKey(publicKey);
    return this.rsa.encrypt(text);
  }

  decrypt(text, privateKey) {
    this.rsa.setPrivateKey(privateKey);
    return this.rsa.decrypt(text);
  }
}
