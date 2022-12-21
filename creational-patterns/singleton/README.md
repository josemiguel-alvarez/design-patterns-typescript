# Singleton

Originally published in: <https://www.jmalvarez.dev/posts/singleton-typescript>

## Introduction

The **singleton** pattern is a creational pattern that allows you to make sure that only one instance of a class is created.

## Applicability

Use the Singleton pattern when:

- it's important that your application only creates an instance of a class.
- the same instance of a class should be use globally.

## Implementation

You can find the full example source code [here](https://github.com/josemiguel-alvarez/design-patterns-typescript/blob/main/creational-patterns/singleton/singleton.ts).

1. Declare a static property to hold the instance of the class. Remember that static properties are shared across all instances of a class.

In the example I'm going to apply the Singleton pattern to a class that represents a database connection.

```ts
class Database {
  private static instance: Database;
}
```

2. Make the constructor of the class private so that it cannot be called from outside the class.

For the example, the constructor won't have any parameters. In a real-world scenario, you might want to pass some configuration to the constructor.

```ts
class Database {
  private static instance: Database;

  private constructor() {}
}
```

3. Declare a static method that will be used to get the Singleton instance of the class. When the method is called for the first time,
   it will create an instance of the class and store it in the static property. On subsequent calls, it will return the instance stored in the static property.

```ts
class Database {
  private static instance: Database;

  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}
```

4. The singleton instance can now be used from anywhere in the application. But first, I'll ad some business logic for the example.

```ts
class Database {
  private static instance: Database;

  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }

  public query(sql: string): void {
    console.log(`Querying database: ${sql}`);
  }
}
```

An example of how client code would use the Singleton instance:

```ts
const database = Database.getInstance();
database.query("SELECT * FROM users");

// Output:
// Querying database: SELECT * FROM users

const database2 = Database.getInstance();
if (database === database2) {
  console.log(
    "The same instance of Database was returned. The Singleton pattern works!"
  );
} else {
  console.log(
    "A new instance of Database was returned. The Singleton pattern failed."
  );
}

// Output:
// The same instance of Database was returned. The Singleton pattern works!
```
