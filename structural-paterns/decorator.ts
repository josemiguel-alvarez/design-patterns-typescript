interface DataSource {
  writeData(data: string): void;
  readData(): string;
}

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

const file = new FileDataSource("file.txt");
file.writeData("Hello world!");
file.readData();

console.log("\n----------\n");

const encryptedFile = new EncryptionDecorator(file);
encryptedFile.writeData("Hello world!");
encryptedFile.readData();

console.log("\n----------\n");

const compressedFile = new ReverseDecorator(file);
compressedFile.writeData("Hello world!");
compressedFile.readData();

console.log("\n----------\n");

const compressedEncryptedFile = new ReverseDecorator(encryptedFile);
compressedEncryptedFile.writeData("Hello world!");
compressedEncryptedFile.readData();
