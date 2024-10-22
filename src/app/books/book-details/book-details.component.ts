import { Component } from '@angular/core';
import { Book } from '../../shared/book';
import { ActivatedRoute, Router } from '@angular/router';
import { BookStoreService } from '../../shared/book-store.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'bm-book-details',
    templateUrl: './book-details.component.html',
    styleUrl: './book-details.component.css'
})
export class BookDetailsComponent {
    book$: Observable<Book>;

    constructor(
        private bookService: BookStoreService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        const isbn = this.route.snapshot.paramMap.get('isbn')!;
        this.book$ = this.bookService.getSingle(isbn);
    }

    removeBook(isbn: string) {
        if (window.confirm('Buch löschen?')) {
            this.bookService.removeBook(isbn).subscribe(() => {
                this.router.navigateByUrl('/books');
            });
        }
    }

}
