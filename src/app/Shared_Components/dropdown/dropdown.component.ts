import { Component, inject, input } from '@angular/core';
import { StateService } from '../../Services/State/state.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [NgClass],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent {

  public stateService: StateService = inject(StateService);

  title = input.required();

}
