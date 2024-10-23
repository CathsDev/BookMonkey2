import { Component, EventEmitter, Output } from '@angular/core';
import { Book } from '../../shared/book';

@Component({
    selector: 'bm-book-form',
    templateUrl: './book-form.component.html',
    styleUrl: './book-form.component.css'
})
export class BookFormComponent {
    book: Book = {
        isbn: '',
        title: '',
        authors: ['']
    };

    @Output() submitBook = new EventEmitter<Book>();

    submitForm() {
        this.submitBook.emit(this.book);
    }

}
