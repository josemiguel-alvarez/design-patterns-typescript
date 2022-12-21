# Factory Method

Originally published in: <https://www.jmalvarez.dev/posts/factory-method-typescript>

## Introduction

The factory method pattern is a creational pattern which provides an interface to create objects in a parent class. Subclasses of that class can override the method that creates the objects to change the type of object that will be created.

This way the creation of the objects is decoupled from the rest of the code.

## Applicability

Use the factory method pattern when:

- you cannot anticipate the type of the object that will be created
- you want to localize the creation of the objects
- you want to provide an easy way of extending the type of objects that can be created

## Implementation

You can find the full example source code [here](https://github.com/josemiguel-alvarez/design-patterns-typescript/blob/main/creational-patterns/factory-method/factory-method.ts).

![Diagram of the factory method pattern. Credit: Vanderjoe - Wikimedia Commons](https://www.jmalvarez.dev/images/factory-method-typescript/diagram.webp)

1. Define an abstract interface for the object that will be created.

In the example I'm going to handle payments so I'm going to use the following interface:

```ts
interface Payment {
  creditCard: number;
}
```

2. Define an abstract class which will have an abstract method to create the objects. In this class you can include any common logic that the objects created by the subclasses will need.

In this example, `createPayment` is the abstract method that will be implemented by the subclasses. It could also be possible to have a default implementation of this method in the abstract class if you want to have some default setup.

Apart from this, I'm including the method `completePayment` which will be common to all the objects created by the subclasses.

```ts
abstract class PaymentGateway {
  public abstract createPayment(creditCard: number, ...args: any[]): Payment;

  public completePayment(payment: Payment): void {
    console.log(
      `Payment with credit card ${payment.creditCard} successfully completed using the PaymentGateway`
    );
  }
}
```

3. Define concreted implementations of the object interface that was defined in the first step.

In the example I will have `PhysicalPayment` and `OnlinePayment`.

```ts
interface PhysicalPayment extends Payment {
  storeLocation: string;
}

interface OnlinePayment extends Payment {
  email: string;
}
```

4. Finally, define the subclasses of the abstract class that will implement the `createPayment` method.

As I have two different object types, I will create two new classes: `PhysicalPaymentGateway` and `OnlinePaymentGateway`.

```ts
class PhysicalPaymentGateway extends PaymentGateway {
  public createPayment(
    creditCard: number,
    storeLocation: string
  ): PhysicalPayment {
    return {
      creditCard,
      storeLocation,
    };
  }
}

class OnlinePaymentGateway extends PaymentGateway {
  public createPayment(creditCard: number, email: string): OnlinePayment {
    return {
      creditCard,
      email,
    };
  }
}
```

5. The factory method is now ready to be used.

An example of how client code would create objects for the online variant:

```ts
const onlinePaymentGateway = new OnlinePaymentGateway();
const onlinePayment = onlinePaymentGateway.createPayment(
  987654321,
  "test@example.com"
);
onlinePaymentGateway.completePayment(onlinePayment);
```

An this is how the client would use the physical variant:

```ts
const physicalPaymentGateway = new PhysicalPaymentGateway();
const physicalPayment = physicalPaymentGateway.createPayment(
  123456789,
  "New York"
);
physicalPaymentGateway.completePayment(physicalPayment);
```

## Advantages

- Client code is **decoupled** from concrete implementations.
- [Single Responsibility Principle](https://www.jmalvarez.dev/posts/single-responsibility-principle-typescript): All the object creation code is placed together.
- [Open/Closed Principle](https://www.jmalvarez.dev/posts/open-closed-principle): New types of objects can be introduced without breaking client code.

As always, make sure it makes sense to use this pattern in your application. Otherwise you could be introducing unnecessary complexity.
