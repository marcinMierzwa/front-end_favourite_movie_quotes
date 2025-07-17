import { Component, computed, input, Signal } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToolTipFavourites } from '../../Models/tooltip/tooltip.config';


@Component({
  selector: 'app-skip-to-favourites',
  standalone: true,
  imports: [MatTooltipModule],
  templateUrl: './skip-to-favourites.component.html',
  styleUrl: './skip-to-favourites.component.scss'
})
export class SkipToFavouritesComponent {

  readonly isLoggedIn = input<boolean>(false);

  readonly matTooltipMessage = computed(() =>  
  !this.isLoggedIn() ? ToolTipFavourites.isNotLoggedIn : ''
  )
  readonly buttonClass = computed(() => {
    const isLoggedIn = this.isLoggedIn();
    if (isLoggedIn) {
      return 'btn btn-sm pointer'
    }
    return 
  });
  
}
