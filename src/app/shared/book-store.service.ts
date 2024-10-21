import { Injectable } from '@angular/core';
import { Book } from './book';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BookStoreService {
    private apiUrl = 'https://api5.angular-buch.com';

    constructor(private http: HttpClient) {}

    getAll(): Observable<Book[]> {
        return this.http.get<Book[]>(`${this.apiUrl}/books`);
    }

    getSingle(isbn: string): Observable<Book> {
        return this.http.get<Book>(`${this.apiUrl}/books/${isbn}`);
    }

    removeBook(isbn: string): Observable<unknown> {
        return this.http.delete(`${this.apiUrl}/books/${isbn}`);
    }

}
