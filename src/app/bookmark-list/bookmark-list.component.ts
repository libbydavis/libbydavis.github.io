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
/**
 * This component displays a list of bookmarks and allows users
 *     to edit or delete each bookmark. 
 * You must provide the bookmarksList Input with 2-way binding as shown in the
 *     example below. This is to ensure both the parent and this component are
 *     aware of any changes made to the list of bookmarks.
 * You should handle the onEditBookmark event in the parent component by providing
 *     a handler function as shown in the example below. This event emits Bookmark
 *     data when the user has selected to edit a bookmark.
 * 
 * Usage:
 * @example
 * <app-bookmark-list (onEditBookmark)="setBookmarkEditData($event)" [(bookmarksList)]="bookmarksList" />
 */
export class BookmarkListComponent {
  @Input({required: true}) bookmarksList!: Bookmark[];
  @Output() bookmarksListChange = new EventEmitter();
  currentPage = 1;
  itemsPerPage = 20;
  bookmarksCurrentPageList!: Bookmark[];
  @Output() onEditBookmark = new EventEmitter();

  /**
   * This function gets a slice (using the page number and items per page) of the bookmarksList.
   * @param pageNumber the page you would like to display
   * @returns an array from bookmarksList of the correct size and starting point
   */
  getBookmarksForCurrentPage(pageNumber: number): Bookmark[] {
    const startIndex = (pageNumber - 1) * this.itemsPerPage;
    return this.bookmarksList.slice(startIndex, startIndex + this.itemsPerPage);
  }

  ngOnInit() {
    // get first page of bookmarks
    this.bookmarksCurrentPageList = this.getBookmarksForCurrentPage(this.currentPage);
  }

  ngOnChanges(changes: SimpleChanges) {
    // if bookmarksList has been changed then update the page data
    // so that the correct results will be displayed
    const bookmarkListData: Bookmark = changes['bookmarksList']?.currentValue;
    if (bookmarkListData) {
      this.bookmarksCurrentPageList = this.getBookmarksForCurrentPage(this.currentPage);
    }
  }

  onPageChange(pageNumber: number) {
    // update the elements to be displayed when the user selects a different page
    this.bookmarksCurrentPageList = this.getBookmarksForCurrentPage(pageNumber);
  }

  /**
   * This function deletes a bookmark from the bookmarksList.
   * @param id the id of the bookmark to delete
   * @param bookmarkName the name of the bookmark to delete (for confirmation with the user)
   */
  deleteBookmark(id: number, bookmarkName: string) {
    const shouldDelete = confirm(`Are you sure you want to delete ${bookmarkName}?`);

    if (shouldDelete) {
      // remove bookmark from list and save change to local storage
      this.bookmarksListChange.emit(this.bookmarksList.filter(bookmark => bookmark.id !== id));
      localStorage.setItem('links', JSON.stringify(this.bookmarksList));
    }
  }

  /**
   * This function emits an event with a bookmark to be edited 
   *     so that the data can be loaded into the bookmark form.
   * It also scrolls the user to the form at the top of the page.
   * @param bookmark the bookmark to be edited
   */
  editBookmark(bookmark: Bookmark) {
    this.onEditBookmark.emit(bookmark);

    // scroll to top so user can see edit form
    window.scrollTo(0, 0);
  }
}
