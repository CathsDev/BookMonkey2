import { Component, EventEmitter, inject, Input, OnChanges, Output } from '@angular/core';
import { Book } from '../../shared/book';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { atLeastOneValue, isbnFormat } from '../shared/validators';
import { AsyncValidatorsService } from '../shared/async-validators.service';

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
                isbnFormat
            ],
            asyncValidators: inject(AsyncValidatorsService).isbnExists()
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
            authors.map(v => new FormControl(v, {nonNullable: true})),
            atLeastOneValue
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

    errorsTranslated(controlName: string) {
        const errorTexts: {
            [controlName: string]: { [errorCode: string]: string }
        } = {
            title: {
                required: $localize`:title required error@@BookFormComponentErrorTitleRequired:Title is required`
            },
            isbn: {
                required: $localize`:isbn required error@@BookFormComponentErrorIsbnRequired:ISBN is required`,
                isbnformat: $localize`:isbn format error@@BookFormComponentErrorIsbnFormat:ISBN must have 10 or 13 characters`,
                isbnexists: $localize`:isbn exists error@@BookFormComponentErrorIsbnExists:ISBN already exists`,
            },
            authors: {
                atleastonevalue: $localize`:at least one author error@@BookFormComponentErrorAtLeastOneAuthor:At least one author required`
            }
        }
        return errorTexts[controlName] || {};
    }

    ngOnChanges(): void {
        if (this.book) {
            this.setFormValues(this.book);
            this.setEditMode(true);
        } else {
            this.setEditMode(false);
        }
    }

    protected readonly isbnFormat = isbnFormat;
}
