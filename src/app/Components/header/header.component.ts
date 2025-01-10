import { Component, inject } from '@angular/core';
import { StateService } from '../../Services/State/state.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public stateService: StateService = inject(StateService);
}
