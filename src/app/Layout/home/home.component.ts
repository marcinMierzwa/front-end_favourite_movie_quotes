import {
  Component,
  inject,
} from '@angular/core';
import { FilterComponent } from "../../Components/filter/filter.component";
import { SearchbarComponent } from "../../Components/searchbar/searchbar.component";
import { QuoteListComponent } from "../quote-list/quote-list.component";
import { HeaderComponent } from "../../Components/header/header.component";
import { NgStyle } from '@angular/common';
import { StateService } from '../../Services/State/state.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgStyle ,FilterComponent, SearchbarComponent, QuoteListComponent, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
stateService: StateService = inject(StateService);


}
