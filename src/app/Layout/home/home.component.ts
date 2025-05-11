import {
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FilterComponent } from "../../Components/filter/filter.component";
import { SearchbarComponent } from "../../Components/searchbar/searchbar.component";
import { QuoteListComponent } from "../quote-list/quote-list.component";
import { HeaderComponent } from "../../Components/header/header.component";
import { StateService } from '../../Services/State/state.service';
import { SortComponent } from "../../Components/sort/sort.component";
import { HomeService } from '../../Services/Home/home.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FilterComponent, SearchbarComponent, QuoteListComponent, HeaderComponent, SortComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
private stateService: StateService = inject(StateService);
private homeService: HomeService = inject(HomeService);
isMobileMode = this.stateService.isScrollMode;

ngOnInit(): void {
  this.homeService.getMovies();
}
}
