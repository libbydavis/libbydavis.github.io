import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Bookmark } from '../bookmark';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bookmark-list',
  standalone: true,
  imports: [NgbPaginationModule],
  templateUrl: './bookmark-list.component.html',
  styleUrl: './bookmark-list.component.css'
})
export class BookmarkListComponent {
  @Input({required: true}) bookmarksList!: Bookmark[];
  @Output() bookmarksListChange = new EventEmitter();
  currentPage = 1;
  itemsPerPage = 20;
  bookmarksCurrentPageList!: Bookmark[];
  @Output() onEditBookmark = new EventEmitter();

  getBookmarksForCurrentPage(pageNumber: number) {
    const startIndex = (pageNumber - 1) * this.itemsPerPage;
    return this.bookmarksList.slice(startIndex, startIndex + this.itemsPerPage);
  }

  ngOnInit() {
    // get first page of bookmarks
    this.bookmarksCurrentPageList = this.getBookmarksForCurrentPage(this.currentPage);
  }

  ngOnChanges(changes: SimpleChanges) {
    const bookmarkListData: Bookmark = changes['bookmarksList']?.currentValue;
    if (bookmarkListData) {
      this.bookmarksCurrentPageList = this.getBookmarksForCurrentPage(this.currentPage);
    }
  }

  onPageChange(pageNumber: number) {
    this.bookmarksCurrentPageList = this.getBookmarksForCurrentPage(pageNumber);
  }

  deleteBookmark(id: number, bookmarkName: string) {
    let shouldDelete = confirm(`Are you sure you want to delete ${bookmarkName}?`);

    if (shouldDelete) {
      // remove bookmark from list and save change to local storage
      this.bookmarksListChange.emit(this.bookmarksList.filter(bookmark => bookmark.id !== id));
      localStorage.setItem('links', JSON.stringify(this.bookmarksList));
    }
  }

  editBookmark(bookmark: Bookmark) {
    this.onEditBookmark.emit(bookmark);

    // scroll to top so user can see edit form
    window.scrollTo(0, 0);
  }
}
