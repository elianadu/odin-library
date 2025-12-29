// variables to add new book
const newBookBtn = document.querySelector("#newBookBtn");
const dialog = document.querySelector("dialog");
const confirmBtn = document.querySelector("#confirmBtn");

// show dialog on click
newBookBtn.addEventListener("click", () => {
  dialog.showModal();
});

confirmBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const numPages = document.querySelector("#numPages").value;
  const hasBeenRead = document.querySelector("#hasBeenRead").checked;
  addBookToLibrary(title, author, numPages, hasBeenRead);
  console.log(myLibrary);

  displayBooks();
  dialog.close();
});

class Book {
  constructor(title, author, numPages, hasBeenRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.hasBeenRead = hasBeenRead;
    this.id = crypto.randomUUID();
  }

  info() {
    if (this.hasBeenRead) {
      return `${this.title} by ${this.author}, ${this.numPages} pages, read`;
    } else {
      return `${this.title} by ${this.author}, ${this.numPages} pages, not read yet`;
    }
  }

  toggleReadStatus() {
    this.hasBeenRead = !this.hasBeenRead;
  }
}

function addBookToLibrary(title, author, numPages, hasBeenRead) {
  // take params, create a book then store it in the array
  let book = new Book(title, author, numPages, hasBeenRead);
  myLibrary.push(book);
}

function removeBookFromLibrary(id) {
  const index = myLibrary.findIndex((book) => book.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
  }
  console.log(myLibrary);
  displayBooks();
}

function displayBooks() {
  bookshelf.replaceChildren(); // kind of janky; clear page and display everything again
  for (let book of myLibrary) {
    const newBook = document.createElement("div");
    newBook.classList.add("shelved");

    const bookInfo = document.createElement("div");
    bookInfo.textContent = book.info();

    // remove book button
    const removeBookBtn = document.createElement("button");
    removeBookBtn.textContent = "Remove";
    removeBookBtn.addEventListener("click", () => {
      removeBookFromLibrary(book.id);
    });

    // has been read checkbox
    const hasBeenReadLabel = document.createElement("label");
    hasBeenReadLabel.textContent = "Read:";
    const hasBeenReadBox = document.createElement("input");
    hasBeenReadBox.type = "checkbox";
    if (book.hasBeenRead) {
      hasBeenReadBox.checked = true;
    }

    hasBeenReadBox.addEventListener("change", () => {
      book.toggleReadStatus();
      bookInfo.textContent = book.info();
    });

    const btnContainer = document.createElement("div");
    btnContainer.classList.add("btnContainer");

    newBook.appendChild(bookInfo);

    hasBeenReadLabel.appendChild(hasBeenReadBox);
    btnContainer.appendChild(hasBeenReadLabel);

    btnContainer.appendChild(removeBookBtn);

    newBook.appendChild(btnContainer);

    bookshelf.appendChild(newBook);
  }
}

const myLibrary = [];
const bookshelf = document.querySelector(".bookshelf");

// tester books
const songOfAchilles = new Book(
  "Song of Achilles",
  "Madeleine Miller",
  200,
  true
);
const thePhantomTollBooth = new Book(
  "The Phantom Tollbooth",
  "Norton Juster",
  150,
  false
);

myLibrary.push(songOfAchilles);
myLibrary.push(thePhantomTollBooth);

displayBooks();
