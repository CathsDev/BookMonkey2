import { Component } from '@angular/core';
import { Book } from './shared/book';

@Component({
  selector: 'bm-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  book: Book | null = null;

  showList() {
      this.book = null;
  }

  showDetails(book: Book) {
      this.book = book;
  }
}
