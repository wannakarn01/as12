export abstract class BaseDAO {
    protected dbName: string = "library.db";

    public abstract initTable(): void;
}