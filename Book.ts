export class Book {
    private id: string;
    private isbn: string;
    private title: string;
    private author: string;
    private isAvailable: boolean;

    constructor(
        id: string,
        isbn: string,
        title: string,
        author: string,
        isAvailable: boolean | number = true
    ) {
        this.id = id;
        this.isbn = isbn;
        this.title = title;
        this.author = author;
        this.isAvailable = typeof isAvailable === "number" ? isAvailable === 1 : isAvailable;
    }
    public getId(): string { return this.id; }
    public getIsbn(): string { return this.isbn; }
    public getTitle(): string { return this.title; }
    public getAuthor(): string { return this.author; }
    public getIsAvailable(): boolean { return this.isAvailable; }
    public setIsAvailable(isAvailable: boolean): void { this.isAvailable = isAvailable; }

    public getInfo(): string {
        const status = this.isAvailable ? "Available" : "Borrowed";
        return `[ISBN: ${this.isbn}] "${this.title}" by ${this.author} - Status: ${status}`;
    }
}