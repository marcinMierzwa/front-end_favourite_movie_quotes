import { Component, inject } from '@angular/core';
import { DropdownComponent } from "../../Shared_Components/dropdown/dropdown.component";
import { StateService } from '../../Services/State/state.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [DropdownComponent],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {

  public stateService: StateService = inject(StateService);

}
