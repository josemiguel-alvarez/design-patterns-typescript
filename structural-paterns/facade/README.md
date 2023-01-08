# Facade

Originally published in: <https://www.jmalvarez.dev/posts/facade-pattern-typescript>

## Introduction

The facade pattern is a structural pattern which allows you to communicate your application with any complex software (like a library or framework) in a simpler way. It is used to create a simplified interface to a complex system.

![Diagram](https://www.jmalvarez.dev/images/facade-pattern-typescript/diagram.webp)

## Applicability

- you don't want your application to be tightly coupled to a 3rd party library or framework
- you want to simplify the interaction of your application with a complex system

## Implementation

You can find the full example source code [here](https://github.com/josemiguel-alvarez/design-patterns-typescript/blob/main/structural-paterns/facade/facade.ts). As an example of the implementation I'm going to create an application that uploads files to a cloud storage service.

Let's imagine that the 3rd-party code is something like the following:

```ts
class CloudProviderService {
  public isLoggedIn(): boolean {
    // Checks if the user is logged in
  }

  public logIn(): void {
    // Logs the user in
  }

  public convertFile(file: string): string {
    // Converts the file to a format that the cloud provider accepts
  }

  public uploadFile(file: string): void {
    // Uploads the file to the cloud provider
  }

  public getFileLink(file: string): string {
    // Returns the link to the uploaded file
  }
}
```

As we don't want to couple our application with this 3rd-party code we are going to create a facade that will hide the complexity of it. This facade will be the only class that our application will interact with.

```ts
class CloudProviderFacade {
  private service: CloudProviderService;

  constructor() {
    this.service = new CloudProviderService();
  }
}
```

Now we have to implement the functions that our application will use to interact with the 3rd-party code. For the example I'm going to only implement one function:

```ts
class CloudProviderFacade {
  private service: CloudProviderService;

  constructor() {
    this.service = new CloudProviderService();
  }

  public uploadFile(file: string): string {
    if (!this.service.isLoggedIn()) {
      this.service.logIn();
    }

    const convertedFile = this.service.convertFile(file);
    this.service.uploadFile(convertedFile);

    return this.service.getFileLink(convertedFile);
  }
}
```

And that's it! Like this we have implemented the Facade pattern. It's very simple and very useful at the same time. A simple example of how the client would use this code:

```ts
const facade = new CloudProviderFacade();
const fileLink = facade.uploadFile("file.txt");
console.log("File link:", fileLink);

/*  
  Output:

  Logging in...
  Converting file... file.txt
  Uploading file... file.txt.converted
  File link: https://example.com/file.txt.converted
*/
```
