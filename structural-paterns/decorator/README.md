# Decorator

Originally published in: <https://www.jmalvarez.dev/posts/decorator-pattern-typescript>

## Introduction

The Decorator pattern is a structural design pattern that allows you to dynamically add new behavior to objects. It does so by wrapping them in special objects called decorators, which contain the added behavior. This is an alternative to inheritance.

The Decorator pattern is useful when you want to add behavior to individual objects, rather than to an entire class of objects. It is also useful when you want to add behavior without affecting the existing hierarchy, or when you want to add behavior that can be changed dynamically at runtime.

![Diagram](https://www.jmalvarez.dev/images/decorator-pattern-typescript/diagram.webp)

## Applicability

The Decorator pattern can be useful when you want to:

- add new behavior to an existing object, but you don't want or can't to modify its class.
- add new behavior to a set of objects, but you don't want to create a new subclass for each object.
- add new behavior that can be changed dynamically at runtime. The Decorator pattern allows you to add or remove the behavior by adding or removing decorator objects.

## Implementation

You can find the full example source code [here](https://github.com/josemiguel-alvarez/design-patterns-typescript/blob/main/structural-paterns/decorator/decorator.ts).

1. Define the interface for the objects that will be decorated. This interface should specify the methods that will be available to the clients of these objects.

In our example I'm going to create the interface `DataSource`.

```ts
interface DataSource {
  writeData(data: string): void;
  readData(): string;
}
```

2. Create a concrete implementation of the interface defined in the previous step. This class will be the base class for the objects that will be decorated.

In our example I'm going to create the class `FileDataSource`.

```ts
class FileDataSource implements DataSource {
  private fileName: string;
  private data: string;

  constructor(fileName: string) {
    this.fileName = fileName;
  }

  writeData(data: string): void {
    console.log(
      `[FileDataSource] Writing to file: ${this.fileName}, data: ${data}`
    );
    this.data = data;
  }

  readData(): string {
    console.log(
      `[FileDataSource] Reading from file: ${this.fileName}, data: ${this.data}`
    );
    return this.data;
  }
}
```

3. Create a decorator class that implements the interface. This class will contain a reference to the object being decorated, and will delegate all method calls to the decorated object. This class will be the base class for the decorators.

```ts
class DataSourceDecorator implements DataSource {
  protected source: DataSource;

  constructor(source: DataSource) {
    this.source = source;
  }

  writeData(data: string): void {
    this.source.writeData(data);
  }

  readData(): string {
    return this.source.readData();
  }
}
```

4. Create a new class for each additional behavior that you want to add to the objects. These classes will extend the base decorator class and will add the new behavior to the decorated object before or after passing the request to the target object.

In our example I want to add two new behaviors. The first one is to encrypt the data before writing it to the file and decrypting it after reading it from the file.

```ts
class EncryptionDecorator extends DataSourceDecorator {
  writeData(data: string): void {
    const base64Data = btoa(data);
    console.log(`[EncryptionDecorator] Encrypted data: ${base64Data}`);
    super.writeData(base64Data);
  }

  readData(): string {
    const base64Data = super.readData();
    const data = atob(base64Data);
    console.log(`[EncryptionDecorator] Decrypted data: ${data}`);
    return data;
  }
}
```

The second one is to reverse the data before writing it to the file and unreversing it after reading it from the file.

```ts
class ReverseDecorator extends DataSourceDecorator {
  writeData(data: string): void {
    const compressedData = data.split("").reverse().join("");
    console.log(`[ReverseDecorator] Reversed data: ${compressedData}`);
    super.writeData(compressedData);
  }

  readData(): string {
    const compressedData = super.readData();
    const data = compressedData.split("").reverse().join("");
    console.log(`[ReverseDecorator] Unreversed data: ${data}`);
    return data;
  }
}
```

5. To use the Decorator pattern, create an instance of the concrete implementation of the interface, and then wrap it in one or more decorator objects. The decorator objects can be created and added dynamically at runtime, allowing you to add or remove behavior as needed.

An example of how client code would use the Decorator pattern with the `EncryptionDecorator`:

```ts
const file = new FileDataSource("file.txt");
const encryptedFile = new EncryptionDecorator(file);

encryptedFile.writeData("Hello world!");
encryptedFile.readData();

/* Output:

  [EncryptionDecorator] Encrypted data: SGVsbG8gd29ybGQh
  [FileDataSource] Writing to file: file.txt, data: SGVsbG8gd29ybGQh
  [FileDataSource] Reading from file: file.txt, data: SGVsbG8gd29ybGQh
  [EncryptionDecorator] Decrypted data: Hello world!
*/
```

Another example but using the `ReverseDecorator`:

```ts
const file = new FileDataSource("file.txt");
const compressedFile = new ReverseDecorator(file);

compressedFile.writeData("Hello world!");
compressedFile.readData();

/* Output:

  [ReverseDecorator] Reversed data: !dlrow olleH
  [FileDataSource] Writing to file: file.txt, data: !dlrow olleH
  [FileDataSource] Reading from file: file.txt, data: !dlrow olleH
  [ReverseDecorator] Unreversed data: Hello world!
*/
```

Both decorators can also be used together:

```ts
const file = new FileDataSource("file.txt");
const encryptedFile = new EncryptionDecorator(file);
const compressedEncryptedFile = new ReverseDecorator(encryptedFile);

compressedEncryptedFile.writeData("Hello world!");
compressedEncryptedFile.readData();

/* Output:

  [ReverseDecorator] Reversed data: !dlrow olleH
  [EncryptionDecorator] Encrypted data: IWRscm93IG9sbGVI
  [FileDataSource] Writing to file: file.txt, data: IWRscm93IG9sbGVI
  [FileDataSource] Reading from file: file.txt, data: IWRscm93IG9sbGVI
  [EncryptionDecorator] Decrypted data: !dlrow olleH
  [ReverseDecorator] Unreversed data: Hello world!
*/
```
