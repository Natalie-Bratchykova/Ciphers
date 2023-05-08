export default class bookCipher {
  #verseMatrix = [];
  noChar = [];

  constructor() {}

  getMatrixFromVerse(verse, columnSize, rowSize) {
    verse
      .split("\n")
      .filter((el) => el.length > 0)
      .forEach((elem, i) => {
        if (i < rowSize) {
          this.#verseMatrix[i] = elem
            .split("")
            .filter((el, j) => j < columnSize);
        }
      });
    return this.#verseMatrix;
  }

  isValidVerse(text, verse, rows, column) {
    this.noChar = [];
    this.#verseMatrix = this.getMatrixFromVerse(verse, column, rows);
    let isValid = false;
    let allcharacters = [];
    //let noChar = [];
    text.split("").map((elem) => {
      let allCoords = [];
      this.#verseMatrix.map((el, i) => {
        el.map((e, j) => {
          if (e.toLowerCase() === elem.toLowerCase()) {
            allCoords.push(`${i}/${j}`);
          }
        });
      });
      if (allCoords.length > 0) {
        allcharacters.push(allCoords[0]);
      } else {
        this.noChar.push(elem);
      }
      if (text.replaceAll("\n", "").length > allcharacters.length) {
        isValid = false;
      } else if (text.replaceAll("\n", "").length === allcharacters.length) {
        isValid = true;
      }
    });
    return isValid;
  }

  encrypt(text, verse, rows, column) {
    this.#verseMatrix = this.getMatrixFromVerse(verse, column, rows);
    let randomCoords = [];
    text.split("").map((elem) => {
      let allCoords = [];
      this.#verseMatrix.map((el, i) => {
        el.map((e, j) => {
          if (e.toLowerCase() === elem.toLowerCase()) {
            allCoords.push(
              `${String(i).length < 2 ? String(i).padStart(2, 0) : i}/${
                String(j).length < 2 ? String(j).padStart(2, 0) : j
              }`
            );
          }
        });
      });
      randomCoords.push(
        allCoords[Math.floor(Math.random() * allCoords.length)]
      );
    });
    return randomCoords.join(", ");
  }

  decrypt(text, verse, rows, column) {
    this.#verseMatrix = this.getMatrixFromVerse(verse, column, rows);
    return text
      .split(", ")
      .map((elem, index) => {
        let elemCoords = elem.split("/");
        return this.#verseMatrix[+elemCoords[0]][+elemCoords[1]];
      })
      .join("");
  }
}

// do validation
