import { Component, inject, input, InputSignal } from '@angular/core';
import { StateService } from '../../Services/State/state.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent {

  public stateService: StateService = inject(StateService);

  readonly title: InputSignal<string> = input.required();
  readonly showArrow: InputSignal<boolean> = input.required();

}
