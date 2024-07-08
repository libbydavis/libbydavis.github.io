import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkFormComponent } from './bookmark-form.component';

describe('BookmarkFormComponent', () => {
  let component: BookmarkFormComponent;
  let fixture: ComponentFixture<BookmarkFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarkFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookmarkFormComponent);
    component = fixture.componentInstance;
    component.bookmarksList = [{id: 1, name: 'test bookmark', url: 'https://www.google.com/'}, {id: 2, name: 'test bookmark 2', url: 'https://angular.dev/'}];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
