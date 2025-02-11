import { Component, inject } from '@angular/core';
import { StateService } from '../../Services/State/state.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private stateService: StateService = inject(StateService);
  isScrollMode = this.stateService.isScrollMode;
}
