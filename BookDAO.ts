import { BaseDAO } from "./BaseDAO";
import { Book } from "./Book";

export class BookDAO extends BaseDAO {
    private books: Map<string, Book> = new Map();

    public override initTable(): void {
        console.log("[BookDAO] Initialized SQLite schema for 'books' table.");
    }

    public addBook(isbn: string, title: string, author: string): boolean {
        if (this.books.has(isbn)) {
            console.log(`[BookDAO] Failed: Book with ISBN '${isbn}' already exists.`);
            return false;
        }
        const newBook = new Book(`B-${Date.now()}`, isbn, title, author, 1); // 1 = true
        this.books.set(isbn, newBook);
        return true;
    }

    public findBookByIsbn(isbn: string): Book | null {
        return this.books.get(isbn) || null;
    }

    public updateAvailability(isbn: string, isAvailable: boolean): boolean {
        const book = this.findBookByIsbn(isbn);
        if (!book) return false;
        book.setIsAvailable(isAvailable);
        return true;
    }

    public findAll(): Book[] {
        return Array.from(this.books.values());
    }
}