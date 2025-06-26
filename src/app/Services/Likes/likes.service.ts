import { computed, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LikesService {
  likeCount = signal<number>(1);
  isLikeCountZero = computed(() => {
    let likeCount = this.likeCount();
    return likeCount === 0 ? true : false;
  });
}
