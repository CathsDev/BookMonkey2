import { Component } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { BookStoreService } from '../../shared/book-store.service';
import { Book } from '../../shared/book';

@Component({
  selector: 'bm-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrl: './book-edit.component.css'
})
export class BookEditComponent {
    book$: Observable<Book>;

    constructor(
        private bookService: BookStoreService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.book$ = this.route.paramMap.pipe(
            map(params => params.get('isbn')!),
            switchMap(isbn => this.bookService.getSingle(isbn))
        );
    }

    update(book: Book) {
        this.bookService.update(book).subscribe(updatedBook => {
            this.router.navigate(['/books', updatedBook.isbn]);
        });
    }

}
