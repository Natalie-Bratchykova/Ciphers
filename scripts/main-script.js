//imports
import TrithemiusCipher from "./Trithemius.js";
import CaesarCipher from "./caesar.js";
const caesar = new CaesarCipher();
const trithemius = new TrithemiusCipher();
// functions
const smoothScroll = (scrollToElem) => {
  scrollToElem.scrollIntoView({ behavoiur: "smooth" });
};
const renderEncryptionSection = (section, title) => {
  let placeholderInfo = "";
  if (title === "Trithemius") {
    placeholderInfo = "12 3 4 or password";
  }
  section.innerHTML = `<h2 class="section-title">${title} Encryption </h2>
    <div class="encrypt-section__content">
      <div class="input-place">
        <textarea
          name=""
          id="input-text-for-encrypt"
          cols="30"
          rows="10"
          placeholder="Input your text or add from file"
        ></textarea>
      </div>
      <div class="key-section" >
        <div class="key-title">Key</div>
        <input type="text" / placeholder="${placeholderInfo}" id = "key">
        <div class="encrypt button" id = "encrypt">Encrypt</div>
        <div class="save-file button">Save as file</div>
        <div class="back-to-menu button">Back to menu</div>
      </div>
      <div class="output-place">
        <textarea
          name=""
          id="output-text-for-encrypt"
          cols="30"
          rows="10"
          placeholder="Your result will appear here"
        ></textarea>
      </div>
    </div>`;
  smoothScroll(section);
};
const renderDecryptionSection = (section, title) => {
  let placeholderInfo = "";
  if (title === "Trithemius") {
    placeholderInfo = "12 3 4 or password";
  }
  section.innerHTML = `<h2 class="section-title">${title} Decryption</h2>
    <div class="decrypt-section__content">
      <div class="input-place">
        <textarea
          name=""
          id="input-text-for-decrypt"
          cols="30"
          rows="10"
          placeholder="Input your text or add from file"
        ></textarea>
      </div>
      <div class="key-section">
        <div class="key-title">Key</div>
        <input type="text" / placeholder="${placeholderInfo}" id = "key">
        <div class="decrypt button" id="decrypt">Decrypt</div>
        <div class="save-file button">Save as file</div>
        <div class="back-to-menu button">Back to menu</div>
      </div>
      <div class="output-place">
        <textarea
          name=""
          id="output-text-for-decrypt"
          cols="30"
          rows="10"
          placeholder="Your result will appear here"
        ></textarea>
      </div>
    </div>`;
  smoothScroll(section);
};
const renderFileNamePopup = (section) => {
  const html = `<div class="saveAs">
<div class="close">X</div>
<div class="title">Input your file name</div>
<form>
  <input type="text" placeholder="file name" id = "file-name" />
  <button class="save">OK</button>
</form>
</div>`;
  section.insertAdjacentHTML("beforeend", html);
};
const backToMenu = (resetSection, menuSection) => {
  document.querySelector(".back-to-menu").addEventListener("click", () => {
    smoothScroll(menuSection);
    resetSection.innerHTML = "";
  });
};
// create file
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
// drag and drop file to read it and encrypt
const dragAndDropFile = (dropArea) => {
  dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  dropArea.addEventListener("dragleave", (e) => {
    e.preventDefault();
  });
  dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const readFile = new FileReader();
    readFile.onload = () => {
      dropArea.value = readFile.result;
    };
    readFile.readAsText(file);
  });
};
// validate key for Caesar
const validateKey = (key, input, output, isEncryption) => {
  if (!Number(key.value)) {
    alert("mistake");
    key.value = "";
  } else {
    output.value = isEncryption
      ? caesar.encrypt(input.value, Number(key.value))
      : caesar.decrypt(input.value, Number(key.value));
  }
};
// file saved popup
const fileSavePopup = (filename) => {
  const savedFilePopup = document.querySelector(".file-saved");
  const closePopup = document.querySelector("#closeX");
  const fileName = document.querySelector("#fileName");
  const acceptFile = document.querySelector("#okay");
  fileName.textContent = filename;
  savedFilePopup.classList.remove("_hidden");
  closePopup.addEventListener("click", () => [
    savedFilePopup.classList.add("_hidden"),
  ]);
  acceptFile.addEventListener("click", () => {
    savedFilePopup.classList.add("_hidden");
  });
};
// check if fields are filled
const checkIfInputFilled = (inputField) => {
  return inputField.value !== "";
};
// proccess getting data from inputs
const proccessInputs = (key, input, output, isEncryption) => {
  if (checkIfInputFilled(input)) {
    validateKey(key, input, output, isEncryption);
  } else {
    alert("Input smth please");
  }
};
// get file name
const getFileNamePopup = document.querySelector(".create-file-name-popup");
const getFileNameClosePopup = document.querySelector(".close-popup");
const getFileNameInput = document.querySelector("#file-name-input");
const getFileNameSave = document.querySelector("#save-name");
const getFileName = () => {
  getFileNamePopup.classList.remove("_hidden");
  //close
  getFileNameClosePopup.addEventListener("click", (e) => {
    e.preventDefault();
    getFileNamePopup.classList.add("_hidden");
  });
};

//======================================================================
//  main part
const goToCaesarCipherEncrypt = document.querySelector("#caesar-cipher");
const goToTretemiusCipherEncrypt = document.querySelector("#tretemius-cipher");
const sectionEncrypt = document.querySelector(".encrypt-section");
const sectionMenu = document.querySelector(".menu");
// Caesar Encrypt
goToCaesarCipherEncrypt.addEventListener("click", () => {
  renderEncryptionSection(sectionEncrypt, "Caesar");
  backToMenu(sectionEncrypt, sectionMenu);

  const encryptBTN = document.querySelector("#encrypt");
  const inputedText = document.querySelector("#input-text-for-encrypt");
  const outputText = document.querySelector("#output-text-for-encrypt");
  // encrypt data
  encryptBTN.addEventListener("click", () => {
    proccessInputs(
      document.querySelector("#key"),
      inputedText,
      outputText,
      true
    );
  });

  // save as file
  const saveFile = document.querySelector(".save-file");
  saveFile.addEventListener("click", () => {
    // alternative way
    getFileName();
    getFileNameSave.addEventListener("click", (e) => {
      e.preventDefault();
      if (getFileNameInput.value !== "") {
        fileSavePopup(getFileNameInput.value);
        getFileNamePopup.classList.add("_hidden");

        createAndSaveFile(outputText.value, getFileNameInput.value);
      } else {
        alert("Please, input your file name");
      }
    });
    getFileNameInput.value = "";
  });

  dragAndDropFile(inputedText);
});
//=======================================================================================
// Trithemius
goToTretemiusCipherEncrypt.addEventListener("click", () => {
  renderEncryptionSection(sectionEncrypt, "Trithemius");
  backToMenu(sectionEncrypt, sectionMenu);
  // encrypt
  const encryptBTN = document.querySelector("#encrypt");
  const inputedText = document.querySelector("#input-text-for-encrypt");
  const outputText = document.querySelector("#output-text-for-encrypt");
  const key = document.querySelector("#key");
  encryptBTN.addEventListener("click", () => {
    if (inputedText.value === "") {
      alert("Please, input something");
    } else {
      outputText.value = trithemius.encrypt(inputedText.value, key.value);
      console.log(outputText.value);
    }
  });
  // drag and drop
  dragAndDropFile(inputedText);
  // save as file
  const saveFileBtn = document.querySelector(".save-file");
  saveFileBtn.addEventListener("click", () => {
    getFileName();
    getFileNameSave.addEventListener("click", (e) => {
      e.preventDefault();
      if (getFileNameInput.value !== "") {
        fileSavePopup(getFileNameInput.value);
        getFileNamePopup.classList.add("_hidden");
        createAndSaveFile(outputText.value, getFileNameInput.value);
      } else {
        alert("Please, input your file name");
      }
    });
    getFileNameInput.value = "";
  });
  // ====================================================================
  //DECRYPTION
  const goToCaesarCipherDecrypt = document.querySelector("#caesar-decrypt");
  const goToTretemiusCipherDecrypt =
    document.querySelector("#tretemius-decrypt");
  const sectionDecrypt = document.querySelector(".decrypt-section");
  // decrypt Caesar
  goToCaesarCipherDecrypt.addEventListener("click", () => {
    renderDecryptionSection(sectionDecrypt, "Caesar");
    backToMenu(sectionDecrypt, sectionMenu);
    const input = document.querySelector("#input-text-for-decrypt");
    const output = document.querySelector("#output-text-for-decrypt");
    // decrypt
    document.querySelector("#decrypt").addEventListener("click", () => {
      proccessInputs(document.querySelector("#key"), input, output, false);
    });
    //save
    document.querySelector(".save-file").addEventListener("click", () => {
      getFileName();
      getFileNameSave.addEventListener("click", (e) => {
        e.preventDefault();
        if (getFileNameInput.value !== "") {
          fileSavePopup(getFileNameInput.value);
          getFileNamePopup.classList.add("_hidden");
          createAndSaveFile(output.value, getFileNameInput.value);
        } else {
          alert("Please, input your file name");
        }
      });
      getFileNameInput.value = "";
    });
    //drag and drop
    dragAndDropFile(input);
  });
  // tretemius
  goToTretemiusCipherDecrypt.addEventListener("click", () => {
    renderDecryptionSection(sectionDecrypt, "Trithemius");
    backToMenu(sectionDecrypt, sectionMenu);
    // decrypt
    const input = document.querySelector("#input-text-for-decrypt");
    const output = document.querySelector("#output-text-for-decrypt");
    const key = document.querySelector("#key");
    const decryptBtn = document.querySelector("#decrypt");
    decryptBtn.addEventListener("click", () => {
      if (input.value === "") {
        alert("Please, input something");
      } else {
        output.value = trithemius.decrypt(input.value, key.value);
      }
    });
    // save as
    document.querySelector(".save-file").addEventListener("click", () => {
      getFileName();
      getFileNameSave.addEventListener("click", (e) => {
        e.preventDefault();
        if (getFileNameInput.value !== "") {
          fileSavePopup(getFileNameInput.value);
          getFileNamePopup.classList.add("_hidden");
          createAndSaveFile(output.value, getFileNameInput.value);
        } else {
          alert("Please, input your file name");
        }
      });
      getFileNameInput.value = "";
    });
    // drag and drop
    dragAndDropFile(input);
  });
});
