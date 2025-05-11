import { Component, inject, input, InputSignal } from '@angular/core';
import { DropdownModel } from './dropdown.model';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent {
  readonly dropdownData: InputSignal<DropdownModel > = input.required();
}
