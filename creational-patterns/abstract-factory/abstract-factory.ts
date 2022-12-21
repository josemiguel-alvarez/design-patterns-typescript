interface Order {
  id: number;
  addProduct(productId: string): void;
  addShippingAddress(address: string): void;
}

interface Payment {
  addCreditCardNumber(ccNumber: number): void;
  completePayment(order: Order): boolean;
}

interface CommerceFactory {
  createOrder(id: number): Order;
  createPayment(): Payment;
}

class OnlineOrder implements Order {
  id: number;

  constructor(id: number) {
    this.id = id;
  }

  addProduct(productId: string): void {
    console.log(`Product ${productId} added to the online order`);
  }

  addShippingAddress(address: string): void {
    console.log(`Shipping address ${address} added to the online order`);
  }
}

class PhysicalOrder implements Order {
  id: number;

  constructor(id: number) {
    this.id = id;
  }

  addProduct(productId: string): void {
    console.log(`Product ${productId} added to the physical order`);
  }
  addShippingAddress(address: string): void {
    console.log(`Shipping address ${address} added to the physical order`);
  }
}

class OnlinePayment implements Payment {
  addCreditCardNumber(ccNumber: number): void {
    console.log(`Credit card number ${ccNumber} added to the online payment`);
  }

  completePayment(order: OnlineOrder): boolean {
    console.log(`Payment completed for the online order ${order.id}`);
    return true;
  }
}

class PhysicalPayment implements Payment {
  addCreditCardNumber(ccNumber: number): void {
    console.log(`Credit card number ${ccNumber} added to the physical payment`);
  }
  completePayment(order: PhysicalOrder): boolean {
    console.log(
      `Physical payment completed for the physical order ${order.id}`
    );
    return true;
  }
}

class OnlineCommerceFactory implements CommerceFactory {
  createOrder(id: number): Order {
    return new OnlineOrder(id);
  }

  createPayment(): Payment {
    return new OnlinePayment();
  }
}

class PhysicalCommerceFactory implements CommerceFactory {
  createOrder(id: number): Order {
    return new PhysicalOrder(id);
  }

  createPayment(): Payment {
    return new PhysicalPayment();
  }
}

// Client code for the online variant
const onlineCommerceFactory = new OnlineCommerceFactory();
const onlineOrder = onlineCommerceFactory.createOrder(1);
const onlinePayment = onlineCommerceFactory.createPayment();

onlineOrder.addProduct("123");
onlineOrder.addShippingAddress("123 Main St");
onlinePayment.addCreditCardNumber(123456789);
onlinePayment.completePayment(onlineOrder);

// Client code for the physical variant
const physicalCommerceFactory = new PhysicalCommerceFactory();
const physicalOrder = physicalCommerceFactory.createOrder(2);
const physicalPayment = physicalCommerceFactory.createPayment();

physicalOrder.addProduct("456");
physicalOrder.addShippingAddress("456 Main St");
physicalPayment.addCreditCardNumber(987654321);
physicalPayment.completePayment(physicalOrder);
