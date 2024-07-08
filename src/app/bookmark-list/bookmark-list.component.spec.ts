import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkListComponent } from './bookmark-list.component';

describe('BookmarkListComponent', () => {
  let component: BookmarkListComponent;
  let fixture: ComponentFixture<BookmarkListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarkListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookmarkListComponent);
    component = fixture.componentInstance;
    component.bookmarksList = [{id: 1, name: 'test bookmark', url: 'https://www.google.com/'}, {id: 2, name: 'test bookmark 2', url: 'https://angular.dev/'}];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
