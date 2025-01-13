import { Component, inject } from '@angular/core';
import { CardComponent } from "../../Shared_Components/card/card.component";
import { StateService } from '../../Services/State/state.service';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, NgClass ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public stateService: StateService = inject(StateService);

  // cards = ['1','2','3','4','5','6']

  cards = ['1','2','3','4']
}
