# Adapter

Originally published in: <https://www.jmalvarez.dev/posts/adapter-pattern-typescript>

## Introduction

The **adapter** pattern (also known as the _Wrapper_ pattern) is a structural design pattern that allows your code to communicate with other interfaces that are initially incompatible.

This pattern is great to use **when you need to integrate third-party libraries that you can't change**, or when you need to integrate legacy code that you can't change.

Imagine that your application works using strings. However, you need to integrate a third-party library that works with JSON objects that contain the strings that you need. You can't change the library's code, but you can apply the adapter pattern to transform those JSON objects into strings to make them compatible with your application. Following this example, if you later had to integrate a new third-party library that was using a different format (for example, XML), you could create a new adapter to make it compatible with your application in a easy way.

Another advantage of this pattern is that **your code is decoupled from external libraries**. This means that you can replace the library that you are using or add new ones without having to change your code.

## Implementation

As an example I'm going to build an application that gets books data from third-party libraries. My app works using a concrete data type but the third-party libraries use different types. I'm going to use the adapter pattern to make them compatible with my application.

1. Declare an interface for the adapters of the third-party libraries. This will be the interface used by your application. The adapter will implement this interface and will be responsible for transforming the data from the third-party library into the format that your application uses.

In the example I'm going to define a method to get the books data and I'm going to also specify the structure of the data that the method will return, which is the data structure that my application works with.

```ts
interface LibraryAdapter {
  getBooks(): { title: string; author: string }[];
}
```

Initially, I'm going to integrate a third-party library that returns the books data in the CSV format. This is the code of the third-party library:

```ts
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
```

2. The next step is to create the adapter for the third-party library. This adapter will implement the interface defined in the previous step and will be responsible for transforming the data from the CSV format to the format that my application uses.

```ts
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
```

3. Now we can already use the adapter with our application:

```ts
const library = new LibraryCSV();
const libraryAdapter = new LibraryCSVAdapter(library);
console.log(libraryAdapter.getBooks());

/* Output:
[
  { title: 'Book 1', author: 'Author 1' },
  { title: 'Book 2', author: 'Author 2' },
  { title: 'Book 3', author: 'Author 3' }
]
*/
```

4. If I wanted to integrate a new third-party library, it would be as easy as defining a new adapter for the new library. For example, I'm going to integrate a library which returns the data in a stringified JSON format.

This would be the library code:

```ts
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
```

And this would be my adapter:

```ts
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
```

And this is how I would use the new adapter with my application:

```ts
const libraryJSON = new LibraryJSON();
const libraryJSONAdapter = new LibraryJSONAdapter(libraryJSON);
console.log(libraryJSONAdapter.getBooks());

/* Output:
[
  { title: 'Book 1', author: 'Author 1' },
  { title: 'Book 2', author: 'Author 2' },
  { title: 'Book 3', author: 'Author 3' }
]
*/
```

Notice that I didn't have to change my existing application code to integrate the new library. I just had to create a new adapter for the new library and use it.
