import { Component } from '@angular/core';
import { Bookmark } from '../bookmark';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-results-page',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './results-page.component.html'
})
/**
 * This component displays a thank you message, a bookmark and a link back to '/'.
 */
export class ResultsPageComponent {
  bookmark: Bookmark | null;

  constructor(private router: Router) {
    const routerState = this.router.getCurrentNavigation()?.extras.state;
    this.bookmark = routerState ? routerState['bookmark'] : null;
  }
}
