import { Component, computed, effect, input, output, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToolTipPosition } from '../../Models/tooltip-position.enum';
import { ToolTipLikes } from '../../Models/tooltip/tooltip.config';

@Component({
  selector: 'app-likes',
  standalone: true,
  imports: [MatTooltipModule, MatButtonModule, MatIconModule],
  templateUrl: './likes.component.html',
  styleUrl: './likes.component.scss'
})
export class LikesComponent {
  readonly quoteId = input.required<string>();
  readonly counter = input.required<number>();
  readonly isLoggedIn = input.required<boolean>();
  readonly isLiked = input<boolean>();
  readonly tooltipPositionBelow = ToolTipPosition.BELOW;
  onToggleLike = output<string>();

// constructor() {
//   effect(()=> console.log('detailIsLiked',this.isLiked(), this.isLoggedIn(), this.quoteId())
//   )
// }


  readonly likesCounter = computed(() => this.counter() > 0 ? this.counter() : '')
  readonly likeIcon = computed(() => {
    const isLiked = this.isLiked();
    return isLiked ? 'thumb_up' : 'thumb_up_off_alt';
  })

  likeToolTipMessage: Signal<ToolTipLikes> = computed(() => {
    const isLiked = this.isLiked();
    const isLoggedIn = this.isLoggedIn();
    if(!isLoggedIn) {
      return ToolTipLikes.isNotLoggedInLike;
    }
    return isLiked ? ToolTipLikes.unlike : ToolTipLikes.like;
  })

  onLikeClick(): void {
    const quoteId = this.quoteId();
    if (quoteId) {
      this.onToggleLike.emit(quoteId);
    }

  }
}
