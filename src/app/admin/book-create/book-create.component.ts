import { Component } from '@angular/core';
import { BookStoreService } from '../../shared/book-store.service';
import { Book } from '../../shared/book';
import { Router } from '@angular/router';

@Component({
    selector: 'bm-book-create',
    templateUrl: './book-create.component.html',
    styleUrl: './book-create.component.css'
})
export class BookCreateComponent {

    constructor(
        private bookService: BookStoreService,
        private router: Router
    ) {
    }

    create(book: Book) {
        this.bookService.create(book).subscribe(createdBook => {
            this.router.navigate(['/books', createdBook.isbn]);
        });
    }
}
