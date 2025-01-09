import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  template: `
    <h1 class="text-light scroll-mode-font m-0 text-center">
      Step into the world of Middle-earth and discover the best quotes from The Lord of the Rings and The Hobbit.
    </h1>
  `,
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
