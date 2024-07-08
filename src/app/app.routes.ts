import { Routes } from '@angular/router';
import { ResultsPageComponent } from './results-page/results-page.component';
import { OverviewPageComponent } from './overview-page/overview-page.component';

export const routes: Routes = [
    {path: '', component: OverviewPageComponent},
    {path: 'results', component: ResultsPageComponent}
];
