import { Component } from '@angular/core';
import { BookStoreService } from '../shared/book-store.service';
import { Book } from '../shared/book';

import {Observable, Subject} from 'rxjs';
import { filter, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';

@Component({
    selector: 'bm-search',
    templateUrl: './search.component.html',
    styleUrl: './search.component.css'
})
export class SearchComponent {
    input$ = new Subject<string>();
    isLoading = false;
    results$: Observable<Book[]>;

    constructor(private bookService: BookStoreService) {
        this.results$ = this.input$.pipe(
            filter(term => term.length >= 3),
            debounceTime(500),
            distinctUntilChanged(),
            tap(() => this.isLoading = true),
            switchMap(term => this.bookService.getAllSearch(term)),
            tap(() => this.isLoading = false)
        );
    }
}
