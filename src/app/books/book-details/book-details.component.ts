import { Component } from '@angular/core';
import { Book } from '../../shared/book';
import { ActivatedRoute, Router } from '@angular/router';
import { BookStoreService } from '../../shared/book-store.service';

@Component({
    selector: 'bm-book-details',
    templateUrl: './book-details.component.html',
    styleUrl: './book-details.component.css'
})
export class BookDetailsComponent {
    book?: Book;

    constructor(
        private bookService: BookStoreService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        const isbn = this.route.snapshot.paramMap.get('isbn')!;
        this.bookService.getSingle(isbn).subscribe(book => {
            this.book = book;
        });
    }

    removeBook(isbn: string) {
        if (window.confirm('Buch löschen?')) {
            this.bookService.removeBook(isbn).subscribe(() => {
                this.router.navigateByUrl('/books');
            });
        }
    }

}
