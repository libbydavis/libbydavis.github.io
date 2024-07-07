import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookmarkFormComponent } from './bookmark-form/bookmark-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Bookmark Library';
}
