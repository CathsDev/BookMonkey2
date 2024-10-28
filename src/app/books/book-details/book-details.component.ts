import { Component } from '@angular/core';
import { AsyncPipe,DatePipe, NgFor, NgIf } from '@angular/common';
import { Book } from '../../shared/book';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BookStoreService } from '../../shared/book-store.service';
import { Observable } from 'rxjs';
import { IsbnPipe } from '../../shared/isbn.pipe';
import { LoggedinOnlyDirective } from '../../shared/loggedin-only.directive';
import { ConfirmDirective } from '../../shared/confirm.directive';

@Component({
    selector: 'bm-book-details',
    templateUrl: './book-details.component.html',
    styleUrl: './book-details.component.css',
    standalone: true,
    imports: [
        NgIf, NgFor, DatePipe, AsyncPipe, RouterLink, IsbnPipe, LoggedinOnlyDirective, ConfirmDirective
    ]
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
        this.bookService.removeBook(isbn).subscribe(() => {
            this.router.navigateByUrl('/books');
        })
    }

}
