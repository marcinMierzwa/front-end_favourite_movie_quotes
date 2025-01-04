import { Component, inject, input } from '@angular/core';
import { StateService } from '../../Services/State/state.service';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent {

  public stateService: StateService = inject(StateService);

  title = input.required();

}
