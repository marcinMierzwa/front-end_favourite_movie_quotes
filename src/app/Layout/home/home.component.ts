import {
  Component,
  inject,
} from '@angular/core';
import { FilterComponent } from "../../Components/filter/filter.component";
import { SearchbarComponent } from "../../Components/searchbar/searchbar.component";
import { QuoteListComponent } from "../quote-list/quote-list.component";
import { HeaderComponent } from "../../Components/header/header.component";
import { StateService } from '../../Services/State/state.service';
import { SortComponent } from "../../Components/sort/sort.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FilterComponent, SearchbarComponent, QuoteListComponent, HeaderComponent, SortComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
private stateService: StateService = inject(StateService);
isMobileMode = this.stateService.isScrollMode;


}
