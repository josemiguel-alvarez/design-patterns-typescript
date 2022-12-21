# Bridge

Originally published in: <https://www.jmalvarez.dev/posts/bridge-pattern-typescript>

## Introduction

The **Bridge** pattern is a structural design pattern that allows you to separate a big class or set of related classes into two different domains: abstraction (also called _interface_) and implementation (also called _platform_).

The abstraction layer is the one that the client will use to interact with our application. This layer is not going to contain the business logic of our application. Instead, it will delegate the work to the implementation layer.

Imagine that you have a class that represents a vehicle. The vehicles can have different engines. You could start with a Mercedes and a BMW vehicles with V6 and V8 as possible engines. Initially you would have 4 combinations of vehicles (each one being a class in your application):

- Mercedes V6
- Mercedes V8
- BMW V6
- BMW V8

Imagine now that you want to add a new engine type: V12. You would have to create 2 new classes:

- Mercedes V6
- Mercedes V8
- Mercedes V12
- BMW V6
- BMW V8
- BMW V12

If now you add a new vehicle, you would have to create 3 new classes. This is not a big deal if you have only 2 or 3 vehicles, but what if you have 100 vehicles? You would have to create 100 new classes for each different engine.

As you can see, this problem grows exponentially. The Bridge pattern allows you to solve this in an easy way separating both domains and being able to develop them independently.

## Applicability

Use the Bridge pattern when:

- you want to split a big class that has several variants of some functionality into two different layers.
- you need to switch between different variants at runtime.

## Implementation

You can find the full example source code [here](https://github.com/josemiguel-alvarez/design-patterns-typescript/blob/main/structural-paterns/bridge/bridge.ts).

In my example I have an application that contains the user interface for different kind of platforms and the backend implementation for each user interface.

1. Define the two different layers (abstraction and implementation) of your classes. In my example the abstraction layer is going to be the _user interface_ and the implementation layer is going to be the _backend_.

Once the two different layers have been clearly defined we can create abstract classes for each layer. The abstraction layer will contain a dependency to the implementation layer. This dependency will be used to delegate the work to the implementation layer.

In these abstract classes you can already define the methods that you want to expose to the client.

```ts
abstract class UI {
  protected backend: Backend;

  constructor(backend: Backend) {
    this.backend = backend;
  }

  abstract render(): void;
}

abstract class Backend {
  abstract getData(): string;
}
```

2. Now we can create the concrete classes for each layer. I will start by adding a UI for the Android and iOS platforms and a backend for both.

```ts
class AndroidUI extends UI {
  public render() {
    const data = this.backend.getData();
    console.log("AndroidUI: Rendering data from the backend ->", data);
  }
}

class IPhoneUI extends UI {
  public render() {
    const data = this.backend.getData();
    console.log("IPhoneUI: Rendering data from the backend ->", data);
  }
}

class MobileBackend implements Backend {
  public getData() {
    return "MobileBackend: Data from the backend";
  }
}
```

3. The client could already use these classes. Notice how the client is responsible of injecting the implementation class in the abstraction class.

Example of client code:

```ts
const mobileBackend = new MobileBackend();
const androidUI = new AndroidUI(mobileBackend);
androidUI.render();

// Output:
// AndroidUI: Rendering data from the backend -> MobileBackend: Data from the backend

const iphoneUI = new IPhoneUI(mobileBackend);
iphoneUI.render();

// Output:
// IPhoneUI: Rendering data from the backend -> MobileBackend: Data from the backend
```

4. Now we can very easily add new variants to our layers. For example, I'm going to add a variant for the Web platform. For this, I only have to add two new classes, without having to modify the existing code (meeting the [Open/Closed principle](https://www.jmalvarez.dev/posts/open-closed-principle)).

```ts
class WebUI extends UI {
  public render() {
    const data = this.backend.getData();
    console.log("WebUI: Rendering data from the backend ->", data);
  }
}

class WebBackend implements Backend {
  public getData() {
    return "WebBackend: Data from the backend";
  }
}
```

And now the client could use this new variant like this:

```ts
const webBackend = new WebBackend();
const webUI = new WebUI(webBackend);
webUI.render();

// Output:
// WebUI: Rendering data from the backend -> WebBackend: Data from the backend
```

It would be possible that we wanted to use the Web backend for the Android and iOS platforms because we wanted to render the application in the mobile browser instead of using the native UI. We wouldn't need to introduce new changes for this, the client could just inject the Web backend in the Android and iOS UIs.

```ts
const androidBrowserUI = new AndroidUI(webBackend);
androidBrowserUI.render();

// Output:
// AndroidUI: Rendering data from the backend -> WebBackend: Data from the backend
```
