import { Component, inject } from '@angular/core';
import { StateService } from '../../Services/State/state.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [NgClass],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss'
})
export class SearchbarComponent {

  public stateService: StateService = inject(StateService);

}
