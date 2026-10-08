import { BookDAO } from "./BookDAO";
import { BorrowRecordDAO } from "./BorrowRecordDAO";

const bookDAO = new BookDAO();
const borrowDAO = new BorrowRecordDAO(bookDAO);

bookDAO.initTable();
borrowDAO.initTable();

console.log("\n=== 1. Adding Books ===");
bookDAO.addBook("978-0132350884", "Clean Code", "Robert C. Martin");
bookDAO.addBook("978-1098110338", "Learning TypeScript", "Josh Goldberg");

console.log("\n=== 2. Display All Books (String Formatting) ===");
bookDAO.findAll().forEach(b => console.log(b.getInfo()));

console.log("\n=== 3. Testing Business Rules ===");
borrowDAO.borrowBook("Apinya", "978-0132350884");
borrowDAO.borrowBook("Somsak", "978-0132350884");
borrowDAO.borrowBook("Apinya", "999-0000000000");

console.log("\n=== 4. Books Status After Borrowing ===");
bookDAO.findAll().forEach(b => console.log(b.getInfo()));