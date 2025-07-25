import { Component, effect, inject, input } from '@angular/core';
import { PageWrapperComponent } from "../../../../Shared_Components/page-wrapper/page-wrapper.component";
import { MovieService } from '../../services/movie.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-movie-layout',
  standalone: true,
  imports: [PageWrapperComponent],
  templateUrl: './movie-layout.component.html',
  styleUrl: './movie-layout.component.scss'
})
export class MovieLayoutComponent {
  private readonly movieService: MovieService = inject(MovieService);
  
    constructor() {
        this.movieService.getMovieById(this.id$);
      }
    id = input.required<string>();
    private readonly id$: Observable<string> = toObservable(this.id);

}
