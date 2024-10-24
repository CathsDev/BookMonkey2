import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import { Book } from '../../shared/book';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'bm-book-form',
    templateUrl: './book-form.component.html',
    styleUrl: './book-form.component.css'
})
export class BookFormComponent implements OnChanges {
    @Input() book?: Book;
    @Output() submitBook = new EventEmitter<Book>();

    form = new FormGroup({
        title: new FormControl('', {
            nonNullable: true,
            validators: Validators.required
        }),
        subtitle: new FormControl('', {
            nonNullable: true
        }),
        isbn: new FormControl('', {
            nonNullable: true,
            validators: [
                Validators.required,
                Validators.minLength(10),
                Validators.maxLength(13),
            ]
        }),
        description: new FormControl('', {
            nonNullable: true
        }),
        published: new FormControl('', {
            nonNullable: true
        }),
        thumbnailUrl: new FormControl('', {
            nonNullable: true
        }),
        authors: this.buildAuthorsArray(['']),
    });

    get authors() {
        return this.form.controls.authors;
    }

    private buildAuthorsArray(authors: string[]) {
        return new FormArray(
            authors.map(v => new FormControl(v, {nonNullable: true}))
        );
    }

    addAuthorControl() {
        this.authors.push(
            new FormControl('', {
                nonNullable: true
            })
        );
    }

    private setFormValues(book: Book) {
        this.form.patchValue(book);
        this.form.setControl(
            'authors',
            this.buildAuthorsArray(book.authors)
        );
    }

    private setEditMode(isEditing: boolean) {
        const isbnControl = this.form.controls.isbn;
        if (isEditing) {
            isbnControl.disable();
        } else {
            isbnControl.enable();
        }
    }

    submitForm() {
        const formValue = this.form.getRawValue();
        const authors = formValue.authors.filter(author => !!author);
        const newBook: Book = {
            ...formValue,
            authors
        };
        this.submitBook.emit(newBook);
    }

    ngOnChanges(): void {
        if (this.book) {
            this.setFormValues(this.book);
            this.setEditMode(true);
        } else {
            this.setEditMode(false);
        }
    }

}
