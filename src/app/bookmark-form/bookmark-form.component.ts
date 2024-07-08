import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Bookmark } from '../bookmark';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UrlValidatorDirective } from '../url-validator.directive';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookmark-form',
  standalone: true,
  imports: [FormsModule, CommonModule, UrlValidatorDirective],
  templateUrl: './bookmark-form.component.html',
  styleUrl: './bookmark-form.component.css'
})
/**
 * This component displays a form so that the user can add a bookmark to the list.
 * Once the user submits their input, the data is saved to local storage.
 * You should provide the bookmarkToEdit Input when the user would like to edit
 *     a bookmark instead of add a new bookmark.
 * You must provide the bookmarksList Input with 2-way binding as shown in the
 *     example below. This is to ensure both the parent and this component are
 *     aware of any changes made to the list of bookmarks.
 * 
 * Usage:
 * @example
 * <app-bootmark-form [bookmarkToEdit]="bookmarkToEdit" [(bookmarksList)]="bookmarksList" />
 */
export class BookmarkFormComponent {
  @Input() bookmarkToEdit?: Bookmark | null;
  @Input({required: true}) bookmarksList!: Bookmark[];
  @Output() bookmarksListChange = new EventEmitter();
  // tell ts that model is definitely initialised
  model!: Bookmark;
  addOrEditLabel = 'Add Bookmark';
  newBookmarkId!: number;
  urlExists = true;

  constructor(private router: Router) {}

  ngOnInit() {
    // get new id and initialise model
    const previousId = this.bookmarksList.length > 0 ? this.bookmarksList[this.bookmarksList.length - 1].id : 0;
    this.newBookmarkId = previousId + 1;
    this.model = new Bookmark(this.newBookmarkId, '', '');
  }

  ngOnChanges(changes: SimpleChanges) {
    /* 
    if the edit button has been clicked in the bookmarks list
    there will be data in the changes for the bookmarkToEdit Input
    */
    const bookmarkData: Bookmark = changes['bookmarkToEdit']?.currentValue;
    if (bookmarkData) {
      this.model = {...bookmarkData};
      this.addOrEditLabel = 'Edit Bookmark';
    }
  }

  /**
   * This function cleans up form to initial state so the user can add a new bookmark.
   */
  onClear() {
    // just reset id as the html reset button clears everything except the id in this case
    this.model.id = this.newBookmarkId;

    // in case we are clearing an existing bookmark we need to reset the title back to Add Bookmark
    this.addOrEditLabel = 'Add Bookmark';
  }

  /**
   * This function checks that a url exists, saves the bookmark to the Input variable and local storage,
   *     then navigates to the results page.
   */
  onSubmit() {
    // if we can send a request to the url it means it exists
    fetch(this.model.url, {mode: 'no-cors'}).then(() => {
      //edit bookmark
      if (this.bookmarkToEdit) {
        let notFound = true;
        let iterator = 0;
        while (notFound && iterator < this.bookmarksList.length) {
          if (this.bookmarksList[iterator].id === this.model.id) {
            notFound = false;
            this.bookmarksList[iterator] = this.model;
          }
          iterator++;
        }
      } else {
        // add new bookmark
        this.bookmarksList.push(this.model);
      }
      this.bookmarksListChange.emit(this.bookmarksList);
      
      // save back to storage
      localStorage.setItem('links', JSON.stringify(this.bookmarksList));
      
      // navigate to results page
      this.router.navigate(['/results'], {state: {bookmark: this.model}})
    }).catch(() => {
      this.urlExists = false;
    })
  }
}
