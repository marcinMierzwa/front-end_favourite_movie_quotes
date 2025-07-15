import {
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  Signal,
  signal,
} from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToolTipPosition } from '../../Models/tooltip-position.enum';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToolTipFavourites } from '../../Models/tooltip/tooltip.config';
import { FavouritesService } from '../../Services/Favoutites/favourites.service';

@Component({
  selector: 'app-card-icons-bar',
  standalone: true,
  imports: [MatTooltipModule, MatButtonModule, MatIconModule],
  templateUrl: './card-icons-bar.component.html',
  styleUrl: './card-icons-bar.component.scss',
})
export class CardIconsBarComponent {
 }
