import { Component } from '@angular/core';
import { Bookmark } from '../bookmark';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-results-page',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './results-page.component.html',
  styleUrl: './results-page.component.css'
})
export class ResultsPageComponent {
  bookmark: Bookmark | null;

  constructor(private router: Router) {
    let routerState = this.router.getCurrentNavigation()?.extras.state;

    this.bookmark = routerState ? routerState['bookmark'] : null;
    
  }
}
