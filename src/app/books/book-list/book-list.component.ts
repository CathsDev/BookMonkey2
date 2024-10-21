import { Component } from '@angular/core';
import { Book } from '../../shared/book';
import { BookStoreService } from '../../shared/book-store.service';

@Component({
  selector: 'bm-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent {
    books: Book[] = [];

    constructor(private booksService: BookStoreService) {
        this.books = this.booksService.getAll();
    }

}

