import { Component, Input, SimpleChange, SimpleChanges } from '@angular/core';
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
export class BookmarkFormComponent {
  @Input() bookmarkToEdit?: Bookmark | null;
  linksList: Bookmark[];
  // tell ts that model is definitely initialised
  model!: Bookmark;
  addOrEditLabel = "Add Bookmark";
  newBookmarkId: number;
  urlExists = true;

  constructor(private router: Router) {
    // get saved links from storage
    const linksInStorage = localStorage.getItem('links');
    this.linksList = linksInStorage ? JSON.parse(linksInStorage) : [];

    // get new id and initialise model
    const previousId = this.linksList.length > 0 ? this.linksList[this.linksList.length - 1].id : 0;
    this.newBookmarkId = previousId + 1;
    this.model = new Bookmark(this.newBookmarkId, "", "");
  }

  ngOnChanges(changes: SimpleChanges) {
    /* 
    if the edit button has been clicked in the bookmarks list
    there will be data in the changes for the bookmarkToEdit Input
    */
    const bookmarkData: Bookmark = changes['bookmarkToEdit'].currentValue;
    if (bookmarkData) {
      this.model = {...bookmarkData};
      this.addOrEditLabel = "Edit Bookmark";
    }
  }

  onClear() {
    // just reset id as the html reset button clears everything except the id in this case
    this.model.id = this.newBookmarkId;

    // in case we are clearing an existing bookmark we need to reset the title back to Add Bookmark
    this.addOrEditLabel = "Add Bookmark";
  }

  onSubmit() {
    // if we can send a request to the url it means it exists
    fetch(this.model.url, {mode: 'no-cors'}).then(res => {
      //edit bookmark
      if (this.bookmarkToEdit) {
        let notFound = true;
        let iterator = 0;
        while (notFound && iterator < this.linksList.length) {
          if (this.linksList[iterator].id === this.model.id) {
            notFound = false;
            this.linksList[iterator] = this.model;
          }
          iterator++;
        }
      } else {
        // add new bookmark
        this.linksList.push(this.model);
      }
      
      // save back to storage
      localStorage.setItem('links', JSON.stringify(this.linksList));
      
      // navigate to results page
      this.router.navigate(['/results'], {state: {bookmark: this.model}})
    }).catch(err => {
      this.urlExists = false;
    })

    
  }
}
