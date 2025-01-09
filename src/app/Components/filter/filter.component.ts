import { Component, inject } from '@angular/core';
import { DropdownComponent } from "../../Shared_Components/dropdown/dropdown.component";
import { StateService } from '../../Services/State/state.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [DropdownComponent, NgClass],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {

  public stateService: StateService = inject(StateService);

}
