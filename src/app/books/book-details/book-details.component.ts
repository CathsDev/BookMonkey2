import { Component } from '@angular/core';
import { Book } from '../../shared/book';
import { ActivatedRoute } from '@angular/router';
import { BookStoreService } from '../../shared/book-store.service';

@Component({
    selector: 'bm-book-details',
    templateUrl: './book-details.component.html',
    styleUrl: './book-details.component.css'
})
export class BookDetailsComponent {
    book?: Book;

    constructor(
        private service: BookStoreService,
        private route: ActivatedRoute,
    ) {
        const isbn = this.route.snapshot.paramMap.get('isbn')!;
        this.book = this.service.getSingle(isbn);
    }

}
