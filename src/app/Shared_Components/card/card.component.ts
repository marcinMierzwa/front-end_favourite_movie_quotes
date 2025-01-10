import { Component, inject } from '@angular/core';
import { StateService } from '../../Services/State/state.service';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgStyle, ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  public stateService: StateService = inject(StateService);

}
