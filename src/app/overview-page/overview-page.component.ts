import { Component } from '@angular/core';
import { BookmarkFormComponent } from '../bookmark-form/bookmark-form.component';
import { BookmarkListComponent } from '../bookmark-list/bookmark-list.component';
import { Bookmark } from '../bookmark';

@Component({
  selector: 'app-overview-page',
  standalone: true,
  imports: [BookmarkFormComponent, BookmarkListComponent],
  templateUrl: './overview-page.component.html'
})
/**
 * This component displays the BookmarkFormComponent and BookmarkListComponent.
 * It also initialises the bookmarksList by getting them from local storage
 *     and sets bookmark data for editing when a user has selected to edit 
 *     a bookmark in the bookmark list.
 */
export class OverviewPageComponent {
  bookmarkFormData?: Bookmark;
  bookmarksList: Bookmark[];

  constructor() {
    // get bookmarks from local storage
    const linksInStorage = localStorage.getItem('links');
    this.bookmarksList = linksInStorage ? JSON.parse(linksInStorage) : [];
  }

  setBookmarkEditData(bookmark: Bookmark) {
    // set bookmark data when user has selected edit on a bookmark
    this.bookmarkFormData = bookmark;
  }
}
