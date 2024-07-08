import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsPageComponent } from './results-page.component';
import { RouterModule } from '@angular/router';
import { OverviewPageComponent } from '../overview-page/overview-page.component';

describe('ResultsPageComponent', () => {
  let component: ResultsPageComponent;
  let fixture: ComponentFixture<ResultsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultsPageComponent, RouterModule.forRoot([{path: '', component: OverviewPageComponent}, {path: 'results', component: ResultsPageComponent}])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultsPageComponent);
    component = fixture.componentInstance;
    history.pushState({state: {bookmark: {id: 1, name: 'test bookmark', url: 'https://www.google.com/'}}}, '');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display message and link back to overview page', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Thanks! Your link has been added.');
    expect(compiled.querySelector('a')?.href).toContain('/');
  });
});
