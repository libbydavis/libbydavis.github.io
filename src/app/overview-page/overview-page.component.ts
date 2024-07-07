import { Component } from '@angular/core';
import { BookmarkFormComponent } from '../bookmark-form/bookmark-form.component';
import { BookmarkListComponent } from '../bookmark-list/bookmark-list.component';
import { Bookmark } from '../bookmark';

@Component({
  selector: 'app-overview-page',
  standalone: true,
  imports: [BookmarkFormComponent, BookmarkListComponent],
  templateUrl: './overview-page.component.html',
  styleUrl: './overview-page.component.css'
})
export class OverviewPageComponent {
  bookmarkFormData?: Bookmark;
  bookmarksList: Bookmark[];

  constructor() {
    // get bookmarks from local storage
    const linksInStorage = localStorage.getItem('links');
    this.bookmarksList = linksInStorage ? JSON.parse(linksInStorage) : [];
  }

  setBookmarkEditData(bookmark: Bookmark) {
    this.bookmarkFormData = bookmark;
  }
}
