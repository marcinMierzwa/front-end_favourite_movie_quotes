import { Component, signal } from '@angular/core';
import { SelectComponent } from '../../Shared_Components/select/select.component';
@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [SelectComponent],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  readonly errorMessage = signal<string>('');

    readonly selectesHeading: string[] = ['Characters', 'Movies'];

}
