"use strict ";
import TrithemiusCipher from "./Trithemius.js";
import CaesarCipher from "./caesar.js";
import XorEncryption from "./XOREncryption.js";
import bookCipher from "./bookCipher.js";
import DES from "./des.js";
import TripleDES from "./tripleDes.js";
import AES from "./aes.js";
import Knapsack from "./knapsack.js";
import RSA from "./RSA.js";
const des = new DES();
const caesar = new CaesarCipher();
const trithemiusCipher = new TrithemiusCipher();
const xorEnc = new XorEncryption();
const tripleDES = new TripleDES();
const aes = new AES();
const knapsack = new Knapsack();
const rsa = new RSA();

// dom elements
// menu
const buttonPangrams = document.querySelector("#pangrams");
const selectCypherType = document.querySelector("#cypher_type");
const buttonAboutMe = document.querySelector("#about_me");
// cipher's title
const cypherTitle = document.querySelector(".title");
const nLabel = document.querySelector("#n_label");
const mLabel = document.querySelector("#module_label");
// key input
let key = document.querySelector("#key");
const keyFormatting = document.querySelector(".key_format");
const asString = document.querySelector("#string");
const asNumbers = document.querySelector("#numbers");
const radioButtons = document.querySelectorAll('input[type = "radio"]');
const desModeSetting = document.querySelector(".des-mode-choice");
const desModeOptions = document.querySelectorAll(`input[name="des-mode"`);
const knapsackKey = document.querySelector(".knapsac__key");
const textAreaGeneratePublicKey = document.querySelector("#knapsackPublicKey");
let buttonGeneratePublicKey = document.querySelector("#generatePublicKey");
const inputSequence = document.querySelector("#sequence");
const module = document.querySelector("#mode_num");
const nNum = document.querySelector("#n_num");
// encrypt-decrypt-menu
let buttonEncrypt = document.querySelector("#encrypt");
let buttonDecrypt = document.querySelector("#decrypt");
const generateGamma = document.querySelector("#generate_gamma");
const buttonSaveAsFile = document.querySelector("#saveAsFile");
// text-area
const textAreasConteiner = document.querySelector(".input_text");
const textArea = document.querySelector("#input_text");
const textAreaGamma = document.querySelector("#generated_gamma");

const verseKey = document.querySelector("#verse-key");
const inputUsersRow = document.querySelector("#row");
const inputUsersColumn = document.querySelector("#columns");
const matrixSetters = document.querySelector(".matrix_setting");

// generate keys
const sectionKeyPairs = document.querySelector(".keys-pairs_section");
const sectionPrivateKeySetting = document.querySelector(
  ".private-key-setting-section"
);
const cancel = document.querySelector(".cancel");
const buttonContinue = document.querySelector("#continue");
const buttonOk = document.querySelector("#Ok");
const setKeyLength = document.querySelector("#key-length");
const setFirstElem = document.querySelector("#key-first-elem");
const setModule = document.querySelector("#setmodule");
const setNnumber = document.querySelector("#setnNumber");
// cipher's types
const cypherTypes = {
  caesar: "caesar",
  trithemius: "trithemius",
  xorEncryption: "xorEncryption",
  bookCipher: "bookCipher",
  cipher: "cipher",
  des: "des",
  tripleDes: "tripleDes",
  aes: "aes",
  knapsack: "knapsack",
  rsa: "rsa",
};
class App {
  constructor() {
    this.cypherType = this.getCypherType();
    this.dreagAndDropFile(textArea);
  }
  getCypherType() {
    //let chosenCypher = "nyan";
    let clickCount = 0;
    selectCypherType.addEventListener("change", (e) => {
      e.preventDefault();
      // default cipher
      if (selectCypherType.value === cypherTypes.cipher) {
        cypherTitle.textContent = "****** cipher";
        this.disable();
      } else {
        this.enable();
      }
      // TRITHEMIUS
      if (selectCypherType.value === cypherTypes.trithemius) {
        this.doTrithemius();
      } else {
        this.resetKeySetting();
      }

      // CAESAR
      if (selectCypherType.value === cypherTypes.caesar) {
        this.doCaesar();
      }
      // XOR
      if (selectCypherType.value === cypherTypes.xorEncryption) {
        this.doXOR();
      } else {
        // hide
        generateGamma.classList.add("_hidden");
        textAreaGamma.classList.add("_hidden");
      }

      // BOOK CIPHER
      if (selectCypherType.value === cypherTypes.bookCipher) {
        this.doBookCipher();
        key.classList.add("_hidden");
        verseKey.classList.remove("_hidden");
        textAreasConteiner.classList.add("double_input");
        matrixSetters.classList.remove("_hidden");
      } else {
        key.classList.remove("_hidden");
        verseKey.classList.add("_hidden");
        textAreasConteiner.classList.remove("double_input");
        matrixSetters.classList.add("_hidden");
      }

      //DES
      if (selectCypherType.value === cypherTypes.des) {
        key = this.replaceElemWithClone(key);
        this.doDES();
      }
      // triple DES
      else if (selectCypherType.value === cypherTypes.tripleDes) {
        key = this.replaceElemWithClone(key);
        this.doTripleDES();
      }

      // AES
      else if (selectCypherType.value === cypherTypes.aes) {
        key = this.replaceElemWithClone(key);
        this.doAES();
      } else {
        desModeSetting.classList.add("_hidden");
        //key.removeEventListener("input", this.changeInputColor);
      }

      // knapsack
      if (selectCypherType.value === cypherTypes.knapsack) {
        this.doKnapsack();
        nNum.style.opacity =
          module.style.opacity =
          nLabel.style.opacity =
          mLabel.style.opacity =
            "1";
      }
      // RSA
      else if (selectCypherType.value === cypherTypes.rsa) {
        this.doRSA();
      } else {
        knapsackKey.style.display = "none";
        key.style.display = "block";
      }
      if (selectCypherType.value != cypherTypes.rsa) {
        document.querySelector(".knapsack__key__group").style.width = "10vw";
        textAreaGeneratePublicKey.style.width = "150px";
      }
    });
    // save file
  }
  disable() {
    key.disabled = true;
    textArea.disabled = true;
  }
  enable() {
    key.disabled = false;
    textArea.disabled = false;
  }
  resetKeySetting() {
    keyFormatting.classList.add("_hidden");
  }
  resetInputs() {
    key.value = "";
    textArea.value = "";
  }

  replaceElemWithClone(elem) {
    let elClone = elem.cloneNode(true);
    console.log(elClone);
    elem.parentNode.replaceChild(elClone, elem);
    return elClone;
  }
  // caesar
  doCaesar() {
    //changes html
    cypherTitle.textContent = "Caesar cipher";
    buttonEncrypt = this.replaceElemWithClone(buttonEncrypt);
    buttonDecrypt = this.replaceElemWithClone(buttonDecrypt);
    buttonEncrypt.addEventListener(
      "click",
      encryptionFunctionality.bind(this, true)
    );
    buttonDecrypt.addEventListener(
      "click",
      encryptionFunctionality.bind(this, false)
    );
    // encryption functionality
    function encryptionFunctionality(isEncryption) {
      if (!/^-?\d+$/.test(key.value)) {
        alert("input numbers, please");
        this.resetInputs();
        return;
      } else {
        if (isEncryption) {
          textArea.value = caesar.encrypt(textArea.value, Number(key.value));
        } else {
          textArea.value = caesar.decrypt(textArea.value, Number(key.value));
        }
      }
    }
  }
  // choose key format
  defineKeyType() {
    let isString = false;
    if (key.value.length === 0 && !/^\s+$/.test(key.value)) {
      alert("Please, input key");
      radioButtons.forEach((btn) => (btn.disabled = true));
      this.resetInputs();
      return;
    } else {
      radioButtons.forEach((btn) => (btn.disabled = false));
    }
    key.addEventListener("input", () => {
      radioButtons.forEach((btn) => (btn.disabled = false));
      if (/^(-?\d+)*(-?\d+)$/.test(key.value.replaceAll(" ", ""))) {
        asNumbers.disabled = false;
        asNumbers.checked = true;
      } else {
        asNumbers.disabled = true;
        asString.checked = true;
      }
    });
    // user choose key type
    if (asString.checked) {
      isString = true;
    }
    return isString;
  }
  // trithemius
  doTrithemius() {
    //html changes
    cypherTitle.textContent = "Trithemius cipher";
    keyFormatting.classList.remove("_hidden");
    buttonEncrypt = this.replaceElemWithClone(buttonEncrypt);
    buttonDecrypt = this.replaceElemWithClone(buttonDecrypt);
    buttonEncrypt.addEventListener(
      "click",
      encryptionFunctionality.bind(this, true)
    );
    buttonDecrypt.addEventListener(
      "click",
      encryptionFunctionality.bind(this, false)
    );
    //encryption  functionality
    function encryptionFunctionality(isEncryption) {
      if (isEncryption) {
        textArea.value = trithemiusCipher.encrypt(
          textArea.value,
          key.value,
          this.defineKeyType()
        );
      } else {
        textArea.value = trithemiusCipher.decrypt(
          textArea.value,
          key.value,
          this.defineKeyType()
        );
      }
    }
  }
  doXOR() {
    //
    console.log("XOR Encryption now");
    cypherTitle.textContent = "XOR Encryption  cipher";
    // replace btns
    buttonEncrypt = this.replaceElemWithClone(buttonEncrypt);
    buttonDecrypt = this.replaceElemWithClone(buttonDecrypt);
    // show
    generateGamma.classList.remove("_hidden");
    textAreaGamma.classList.remove("_hidden");

    // generate gamma
    generateGamma.addEventListener("click", () => {
      //textAreaGamma.value = xorEnc.generateGamma(textArea.value, key.value);
      if (
        key.value.length != 0 &&
        textArea.value.length != 0 &&
        !/^\s*$/.test(key.value)
      ) {
        textAreaGamma.value = xorEnc.generateGamma(key.value, textArea.value);
      } else {
        alert("Please, input your key or text into appropriate fields");
        textAreaGamma.value = "";
      }
    });

    buttonEncrypt.addEventListener("click", encryptionFunctionality);
    buttonDecrypt.addEventListener("click", encryptionFunctionality);

    function encryptionFunctionality() {
      if (textAreaGamma.value.length != 0) {
        textArea.value = xorEnc.doCipher(textArea.value, textAreaGamma.value);
      } else {
        alert(`There's no gamma here`);
      }
    }
    // check keys
  }
  // open file
  //   open file like drag and drop
  dreagAndDropFile(acceptArea) {
    acceptArea.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
    acceptArea.addEventListener("dragleave", (e) => {
      e.preventDefault();
    });
    acceptArea.addEventListener("drop", (e) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      const readFile = new FileReader();
      readFile.onload = () => {
        acceptArea.value = readFile.result;
      };
      readFile.readAsText(file);
    });
  }
  checkRowsColInput() {
    let isValid = false;
    if (
      inputUsersColumn.value === "" ||
      inputUsersRow.value === "" ||
      inputUsersRow.value == 0 ||
      inputUsersColumn.value == 0
    ) {
      alert("the value for rows and columns is empty");
    } else {
      isValid = true;
    }

    return isValid;
  }
  // book cipher
  doBookCipher() {
    // initialise obj
    const bookcipher = new bookCipher();
    cypherTitle.textContent = "Book Cipher";
    this.dreagAndDropFile(verseKey);
    if (verseKey.value.length > 0) {
      getAppropriateColumnsRowsNum();
    }

    buttonDecrypt = this.replaceElemWithClone(buttonDecrypt);
    buttonEncrypt = this.replaceElemWithClone(buttonEncrypt);

    // encrypt
    buttonEncrypt.addEventListener("click", function () {
      if (checkMatrixRequires()) {
        alert("the value for rows and columns is empty");
      } else {
        if (
          !bookcipher.isValidVerse(
            textArea.value,
            verseKey.value,
            Number(inputUsersRow.value),
            Number(inputUsersColumn.value)
          )
        ) {
          alert(
            "choose another verse. Symbols [" +
              bookcipher.noChar.join(" ,") +
              "] are not mathced"
          );
        } else {
          textArea.value = bookcipher.encrypt(
            textArea.value,
            verseKey.value,
            Number(inputUsersRow.value),
            Number(inputUsersColumn.value)
          );
        }
      }
    });

    // decrypt
    buttonDecrypt.addEventListener("click", function () {
      if (checkMatrixRequires()) {
        alert("the value for rows and columns is not correct");
      } else {
        textArea.value = bookcipher.decrypt(
          textArea.value,
          verseKey.value,
          Number(inputUsersRow.value),
          Number(inputUsersColumn.value)
        );
      }
    });

    function checkMatrixRequires() {
      return (
        inputUsersColumn.value === "" ||
        inputUsersRow.value === "" ||
        inputUsersRow.value == 0 ||
        inputUsersColumn.value == 0 ||
        Number(inputUsersColumn.value) < 0 ||
        Number(inputUsersRow.value) < 0
      );
    }
  }
  defineMode() {
    let encryptMode = "";
    desModeOptions.forEach((el) => {
      if (el.checked) {
        encryptMode = el.id;
      }
    });
    return encryptMode;
  }
  changeInputColor(appropriateLength) {
    if (key.value.length < appropriateLength) {
      key.classList.add("unappropriateKey");
    } else {
      key.classList.remove("unappropriateKey");
    }
  }
  //DES
  doDES() {
    cypherTitle.textContent = "DES";
    desModeSetting.classList.remove("_hidden");
    key.addEventListener("input", this.changeInputColor.bind(this, 8));

    // refresh buttons
    buttonDecrypt = this.replaceElemWithClone(buttonDecrypt);
    buttonEncrypt = this.replaceElemWithClone(buttonEncrypt);
    let encryptiv = "";
    buttonEncrypt.addEventListener("click", () => {
      let encryptMode = this.defineMode();
      // checks
      // text
      if (textArea.value.length === 0) {
        alert("INPUT TEXT PLEASE📝");
        return;
      }
      // key
      if (key.value === "") {
        alert("INPUT KEY PLEASE 🔑");
        return;
      } else if (key.value.length < 8) {
        alert(
          `INPUT KEY WITH ENOUGHT LENGTH(8 CHARACTERS)PLEASE 🔑\nCURRENT KEY LENGTH = ${key.value.length}`
        );
        return;
      } else if (key.value.length > 8) {
        key.value = key.value.substring(0, 8);
      }
      // encrypt mode
      if (encryptMode === "") {
        alert("PLEASE, CHOOSE AN ENCRYPTION MODE!👩‍💻");
        return;
      }
      console.log(`encrypt mode = ${encryptMode}`);
      let encrtpted = des.encrypt(
        textArea.value,
        key.value,
        encryptMode.toUpperCase()
      );
      textArea.value = encrtpted.encryptedText;
      encryptiv = encrtpted.iv;
    });

    buttonDecrypt.addEventListener("click", () => {
      let encryptMode = this.defineMode();
      textArea.value = des.decrypt(
        textArea.value,
        key.value,
        encryptMode.toUpperCase(),
        encryptiv
      );
    });
  }
  doTripleDES() {
    cypherTitle.textContent = "TRIPLE DES";
    desModeSetting.classList.remove("_hidden");
    key.addEventListener("input", this.changeInputColor.bind(this, 24));
    // refresh buttons
    buttonDecrypt = this.replaceElemWithClone(buttonDecrypt);
    buttonEncrypt = this.replaceElemWithClone(buttonEncrypt);
    let encryptiv = "";
    buttonEncrypt.addEventListener("click", () => {
      let encryptMode = this.defineMode();
      // checks
      // text
      if (textArea.value.length === 0) {
        alert("INPUT TEXT PLEASE📝");
        return;
      }
      // key
      if (key.value === "") {
        alert("INPUT KEY PLEASE 🔑");
        return;
      } else if (key.value.length < 24) {
        alert(
          `INPUT KEY WITH ENOUGHT LENGTH(24 CHARACTERS)PLEASE 🔑\nCURRENT KEY LENGTH = ${key.value.length}`
        );
        return;
      } else if (key.value.length > 24) {
        key.value = key.value.substring(0, 24);
      }
      // encrypt mode
      if (encryptMode === "") {
        alert("PLEASE, CHOOSE AN ENCRYPTION MODE!👩‍💻");
        return;
      }
      console.log(`encrypt mode = ${encryptMode}`);
      let encrtpted = tripleDES.encrypt(
        textArea.value,
        key.value,
        encryptMode.toUpperCase()
      );
      textArea.value = encrtpted.encryptedText;
      encryptiv = encrtpted.iv;
    });

    buttonDecrypt.addEventListener("click", () => {
      let encryptMode = this.defineMode();
      textArea.value = tripleDES.decrypt(
        textArea.value,
        key.value,
        encryptMode.toUpperCase(),
        encryptiv
      );
    });
  }
  // DO AES
  doAES() {
    cypherTitle.textContent = "AES";
    desModeSetting.classList.remove("_hidden");

    buttonDecrypt = this.replaceElemWithClone(buttonDecrypt);
    buttonEncrypt = this.replaceElemWithClone(buttonEncrypt);
    let encryptiv = "";
    buttonEncrypt.addEventListener("click", () => {
      let encryptMode = this.defineMode();
      // checks
      // text
      if (textArea.value.length === 0) {
        alert("INPUT TEXT PLEASE📝");
        return;
      }
      // key
      if (key.value === "") {
        alert("INPUT KEY PLEASE 🔑");
        return;
      } else if (
        key.value.length != 16 &&
        key.value.length != 24 &&
        key.value.length != 32
      ) {
        alert(
          `INPUT KEY WITH ENOUGHT LENGTH(16, 24 or 32 CHARACTERS are required)PLEASE 🔑\n CURRENT KEY LENGTH = ${key.value.length}`
        );
        return;
      }
      // encrypt mode
      if (encryptMode === "") {
        alert("PLEASE, CHOOSE AN ENCRYPTION MODE!👩‍💻");
        return;
      }
      console.log(`encrypt mode = ${encryptMode}`);
      let encrtpted = aes.encrypt(
        textArea.value,
        key.value,
        encryptMode.toUpperCase()
      );
      textArea.value = encrtpted.encryptedText;
      encryptiv = encrtpted.iv;
    });

    buttonDecrypt.addEventListener("click", () => {
      let encryptMode = this.defineMode();
      textArea.value = aes.decrypt(
        textArea.value,
        key.value,
        encryptMode.toUpperCase(),
        encryptiv
      );
    });
  }
  // KNAPSACK
  doKnapsack() {
    cypherTitle.textContent = "Knapsack Cipher";
    key.style.display = "none";
    knapsackKey.style.display = "grid";
    buttonGeneratePublicKey = this.replaceElemWithClone(
      buttonGeneratePublicKey
    );
    // knapsack
    buttonGeneratePublicKey.addEventListener("click", () => {
      if (
        inputSequence.value.length === 0 ||
        textAreaGeneratePublicKey.value.length === 0 ||
        module.value.length === 0 ||
        nNum.value.length === 0
      ) {
        sectionKeyPairs.style.display = "block";

        document
          .querySelector(".cancel_pairs")
          .addEventListener("click", () => {
            sectionKeyPairs.style.display = "none";
          });
        buttonContinue.addEventListener("click", () => {
          if (document.querySelector("#generatePrivateKey").checked) {
            sectionPrivateKeySetting.style.display = "block";

            sectionKeyPairs.style.display = "none";
          } else if (document.querySelector("#automatically").checked) {
            let autoGenerateKeys = knapsack.generateKeysAutomatically();
            inputSequence.value = autoGenerateKeys.privateKey;
            module.value = autoGenerateKeys.m;
            nNum.value = autoGenerateKeys.n;
            textAreaGeneratePublicKey.value = autoGenerateKeys.publicKey;
            sectionKeyPairs.style.display = "none";
          }
        });
        buttonOk.addEventListener("click", () => {
          if (
            setKeyLength.value.length === 0 ||
            setFirstElem.value.length === 0
          ) {
            alert("fill fields please");
          } else {
            inputSequence.value = knapsack.generatePrivateKey(
              Number(document.querySelector("#key-length").value),
              Number(document.querySelector("#key-first-elem").value)
            );
            sectionPrivateKeySetting.style.display = "none";
          }
        });

        document
          .querySelector(".cancel-private")
          .addEventListener("click", () => {
            sectionPrivateKeySetting.style.display = "none";
          });
      }
      if (module.value.length === 0 || nNum.value.length === 0) {
        alert("Fill MODULE  or N please");
        return;
      }
      if (knapsack.hasOnlyOneGCD(Number(module.value), Number(nNum.value))) {
        //B sequence
        let BSequence = inputSequence.value.split(",").map((e) => Number(e));
        textAreaGeneratePublicKey.value = knapsack.generatePublicKey(
          BSequence,
          Number(module.value),
          Number(nNum.value)
        );
      } else {
        alert("MODULE and N have more than 1 common divider");
      }
    });
    buttonDecrypt = this.replaceElemWithClone(buttonDecrypt);
    buttonEncrypt = this.replaceElemWithClone(buttonEncrypt);

    buttonEncrypt.addEventListener("click", () => {
      let publicKey = textAreaGeneratePublicKey.value
        .split(",")
        .map((e) => Number(e));

      textArea.value = knapsack.encrypt(textArea.value, publicKey);
    });
    buttonDecrypt.addEventListener("click", () => {
      let privateKey = inputSequence.value.split(",").map((e) => Number(e));
      console.log("private key" + privateKey);
      textArea.value = knapsack.decrypt(
        textArea.value,
        privateKey,
        Number(module.value),
        Number(nNum.value)
      );
    });
  }

  doRSA() {
    cypherTitle.textContent = "RSA Cipher";
    key.style.display = "none";
    knapsackKey.style.display = "grid";
    // knapsackKey.style.gridsettemplatesetareas =
    //   '"input 1 publicKey" "generateBtn generateBtn"';
    nNum.style.opacity =
      module.style.opacity =
      nLabel.style.opacity =
      mLabel.style.opacity =
        "0";

    document.querySelector(".knapsack__key__group").style.width = "30vw";
    textAreaGeneratePublicKey.style.width = "27vw";

    // reset buttons
    buttonDecrypt = this.replaceElemWithClone(buttonDecrypt);
    buttonEncrypt = this.replaceElemWithClone(buttonEncrypt);
    buttonGeneratePublicKey = this.replaceElemWithClone(
      buttonGeneratePublicKey
    );

    // generate public and private Keys
    buttonGeneratePublicKey.addEventListener("click", async () => {
      let keys = rsa.generateKeys();
      inputSequence.value = keys.privateKey;
      textAreaGeneratePublicKey.value = keys.publicKey;
    });

    buttonEncrypt.addEventListener("click", async () => {
      textArea.value = rsa.encrypt(
        textArea.value,
        textAreaGeneratePublicKey.value
      );
    });
    buttonDecrypt.addEventListener("click", async () => {
      textArea.value = rsa.decrypt(textArea.value, inputSequence.value);
    });
  }
}
const app = new App();
// save file
const createAndSaveFile = (fileContent, fileName) => {
  const a = document.createElement("a");
  const file = new Blob([fileContent], { type: "text/plain;charset=utf-8" });
  const url = window.URL.createObjectURL(file);
  //revoke;
  a.href = url;
  a.download = `${fileName}.txt`;
  a.click();
  URL.revokeObjectURL(url);
};

buttonSaveAsFile.addEventListener("click", () => {
  let fileName = prompt("input file name");
  if (fileName != null) {
    createAndSaveFile(textArea.value, fileName);
  } else {
    return;
  }
});

// get rows/columns input setting

function getAppropriateColumnsRowsNum() {
  if (verseKey.value.length > 0) {
    // rows
    inputUsersRow.value = verseKey.value.split("\n").length;
    inputUsersRow.setAttribute("max", verseKey.value.split("\n").length);
    // colums
    let minValue = verseKey.value
      .split("\n")
      .filter((el) => el.length > 0)
      .map((el) => (el = el.length));
    console.log(`min value length = ${Math.min(...minValue)}`);
    inputUsersColumn.value = Math.min(...minValue);
    inputUsersColumn.setAttribute("max", Math.min(...minValue));
  }
}

verseKey.addEventListener("input", getAppropriateColumnsRowsNum);

//
