# Composite

Originally published in: <https://www.jmalvarez.dev/posts/composite-pattern-typescript>

## Introduction

The composite pattern is a structural pattern which allows you to create tree structures of objects and treat them as a single object. The tree can contain individual or groups of objects which can be treated in the exact same way. This pattern is useful to represent a hierarchy of objects.

## Applicability

- your model can be represented as a tree structure
- you want to simplify the interaction of the client code with your model

## Implementation

You can find the full example source code [here](https://github.com/josemiguel-alvarez/design-patterns-typescript/blob/main/structural-paterns/composite/composite.ts). As an example of the implementation I'm going to create an application that represents a Text Editor.

1. The first step would be to define the objects of the model of your application. Initially, in the example we are going to have:

- the `SimpleText` object, which will be used to render text on the UI.
- the `SimpleImage` object, which will be used to render images on the UI.
- the `Block` component, which represents a group of objects. I will use this object to create paragraphs.

2. Once we have defined our objects we have to create a common interface for them. All of my objects will have the function `render`.

```ts
interface Component {
  render: () => void;
}
```

3. Now we have to create the classes of the different objects defined in the first step. These classes have to implement the interface we just defined.

```ts
class SimpleText implements Component {
  private text: string;

  constructor(text: string) {
    this.text = text;
  }

  public render() {
    console.log("Rendering text:", this.text);
  }
}
```

```ts
class SimpleImage implements Component {
  private src: string;

  constructor(src: string) {
    this.src = src;
  }

  public render() {
    console.log("Rendering image:", this.src);
  }
}
```

```ts
class Block implements Component {
  private children: Component[] = [];

  public add(child: Component): void {
    this.children.push(child);
  }

  public render() {
    this.children.forEach((child) => child.render());
  }
}
```

As you can see, if we `render` the simple objects like `SimpleText` or `SimpleImage` they will execute some logic implemented in those classes. But if we `render` the `Block` component it will call the `render` function of all of it's children. We can interact with the tree of objects as it was a single object if we interact with the root object.

4. And that's it! Like this we have implemented the Composite pattern. A simple example of how the client would use this code creating just one block containing a line of text and an image:

```ts
const block = new Block();
block.add(new SimpleText("Hello"));
block.add(new SimpleImage("https://example.com/image.png"));

block.render();

/*  
  Output:

  Rendering text: Hello
  Rendering image: https://example.com/image.png
*/
```

A more complex example of nested blocks would be:

```ts
const nestedBlock = new Block();
nestedBlock.add(new SimpleText("Hello, check the following image:"));
nestedBlock.add(new SimpleImage("https://example.com/image.png"));

const mainBlock = new Block();
mainBlock.add(nestedBlock);
mainBlock.add(new SimpleText("Thanks for reading!"));

mainBlock.render();

/*  
  Output:

  Rendering text: Hello, check the following image:
  Rendering image: https://example.com/image.png
  Rendering text: Thanks for reading!
*/
```

## Advantages

- Work with complex object structures in a simpler way, making it easier to manipulate and interact with the tree of objects.
- [Open/Closed Principle](https://www.jmalvarez.dev/posts/open-closed-principle). You can introduce new types of objects to the application without modifying the existing code.
