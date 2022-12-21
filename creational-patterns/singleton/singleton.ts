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

// Example client code
const database = Database.getInstance();
database.query("SELECT * FROM users");

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
