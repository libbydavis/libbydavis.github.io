import { Component, EventEmitter, Output } from '@angular/core';
import { Bookmark } from '../bookmark';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookmark-list',
  standalone: true,
  imports: [NgbPaginationModule],
  templateUrl: './bookmark-list.component.html',
  styleUrl: './bookmark-list.component.css'
})
export class BookmarkListComponent {
  bookmarksList: Bookmark[];
  currentPage = 1;
  itemsPerPage = 20;
  bookmarksCurrentPageList: Bookmark[];
  @Output() onEditBookmark = new EventEmitter();

  getBookmarksForCurrentPage(pageNumber: number) {
    const startIndex = (pageNumber - 1) * this.itemsPerPage;
    return this.bookmarksList.slice(startIndex, startIndex + this.itemsPerPage);
  }

  constructor() {
    // get bookmarks from local storage
    const linksInStorage = localStorage.getItem('links');
    this.bookmarksList = linksInStorage ? JSON.parse(linksInStorage) : [];

    // get first page of bookmarks
    this.bookmarksCurrentPageList = this.getBookmarksForCurrentPage(this.currentPage);
  }

  onPageChange(pageNumber: number) {
    this.bookmarksCurrentPageList = this.getBookmarksForCurrentPage(pageNumber);
  }

  deleteBookmark(id: number, bookmarkName: string) {
    let shouldDelete = confirm(`Are you sure you want to delete ${bookmarkName}?`);

    if (shouldDelete) {
      // remove bookmark from list and save change to local storage
      this.bookmarksList = this.bookmarksList.filter(bookmark => bookmark.id !== id);
      localStorage.setItem('links', JSON.stringify(this.bookmarksList));

      // update page of bookmarks from new bookmarks list
      this.bookmarksCurrentPageList = this.getBookmarksForCurrentPage(this.currentPage);
    }
  }

  editBookmark(bookmark: Bookmark) {
    this.onEditBookmark.emit(bookmark);

    // scroll to top so user can see edit form
    window.scrollTo(0, 0);
  }
}
