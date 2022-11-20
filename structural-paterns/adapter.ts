class LibraryCSV {
  getBooks() {
    const books = [
      { title: "Book 1", author: "Author 1" },
      { title: "Book 2", author: "Author 2" },
      { title: "Book 3", author: "Author 3" },
    ];

    return (
      "title,author\r\n" +
      books.map((book) => `${book.title},${book.author}`).join("\r\n")
    );
  }
}

class LibraryJSON {
  getBooks() {
    const books = [
      { title: "Book 1", author: "Author 1" },
      { title: "Book 2", author: "Author 2" },
      { title: "Book 3", author: "Author 3" },
    ];

    return JSON.stringify(books);
  }
}

interface LibraryAdapter {
  getBooks(): { title: string; author: string }[];
}

class LibraryCSVAdapter implements LibraryAdapter {
  private library: LibraryCSV;

  constructor(library: LibraryCSV) {
    this.library = library;
  }

  getBooks() {
    const books = this.library.getBooks();
    const booksArray = books.split("\r\n");
    const booksData = booksArray.slice(1);

    return booksData.map((book) => {
      const bookData = book.split(",");
      return {
        title: bookData[0],
        author: bookData[1],
      };
    });
  }
}

class LibraryJSONAdapter implements LibraryAdapter {
  private library: LibraryJSON;

  constructor(library: LibraryJSON) {
    this.library = library;
  }

  getBooks() {
    const books = this.library.getBooks();
    return JSON.parse(books);
  }
}

console.log("Client code using the CSV adapter");
const library = new LibraryCSV();
const libraryAdapter = new LibraryCSVAdapter(library);
console.log(libraryAdapter.getBooks());

console.log("Client code using the JSON adapter");
const libraryJSON = new LibraryJSON();
const libraryJSONAdapter = new LibraryJSONAdapter(libraryJSON);
console.log(libraryJSONAdapter.getBooks());
