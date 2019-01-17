import {observable} from "mobx";
import {httpWithHeaders} from "../utils/custom_http";


interface Book {
    id: number,
    name: string,
    author: string,
    num_pages: number,
    num_symbols: number,
    user: number,
    pub_house: string
}

export class MarketStore {
    @observable books: Book[];

    constructor() {
        this.books = [];
    }

    getBooks = async (): Promise<Book[]> => {
        const transactions = await httpWithHeaders().get("/book/books/");
        this.books = transactions.data;
        return this.books;
    };

    emptyStore() {
        this.books = [];
    }
}