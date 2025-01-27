import {
  Component,
  signal,
} from '@angular/core';
import { FilterComponent } from "../../Components/filter/filter.component";
import { SearchbarComponent } from "../../Components/searchbar/searchbar.component";
import { QuoteListComponent } from "../quote-list/quote-list.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FilterComponent, SearchbarComponent, QuoteListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {



}
