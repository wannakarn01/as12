import { BaseDAO } from "./BaseDAO";
import { BookDAO } from "./BookDAO";

export class BorrowRecordDAO extends BaseDAO {
    private bookDAO: BookDAO;
    private records: Array<{ id: string; borrowerName: string; bookIsbn: string; borrowDate: string }> = [];

    constructor(bookDAO: BookDAO) {
        super();
        this.bookDAO = bookDAO;
    }

    public override initTable(): void {
        console.log("[BorrowRecordDAO] Initialized SQLite schema for 'borrow_records' table.");
    }

    public borrowBook(borrowerName: string, isbn: string): boolean {
        const book = this.bookDAO.findBookByIsbn(isbn);
        if (!book) {
            console.log(`[BorrowRecordDAO] Reject: ISBN '${isbn}' not found in database.`);
            return false;
        }

        if (!book.getIsAvailable()) {
            console.log(`[BorrowRecordDAO] Reject: "${book.getTitle()}" (ISBN: ${isbn}) is currently borrowed.`);
            return false;
        }

        const record = {
            id: `REC-${Date.now()}`,
            borrowerName: borrowerName,
            bookIsbn: isbn,
            borrowDate: new Date().toISOString()
        };

        this.records.push(record);
        this.bookDAO.updateAvailability(isbn, false);

        console.log(`[BorrowRecordDAO] Success: '${borrowerName}' borrowed "${book.getTitle()}".`);
        return true;
    }
}