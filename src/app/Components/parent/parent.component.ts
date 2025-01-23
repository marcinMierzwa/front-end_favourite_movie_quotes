import { Component } from '@angular/core';
import { OverlflowTestComponent } from '../overlflow-test/overlflow-test.component';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [OverlflowTestComponent],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss',
})
export class ParentComponent {
  texts = [
    {
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, tempore ab libero nulla reiciendis impedit commodi tempora error voluptate deserunt sequi saepe corrupti fuga obcaecati, ad perspiciatis maiores magnadddddddddddddd magnadddddddddddddd magnadddddddddddd magnadddddddddddddd magnadddddddddddddd magnadddddddddddddd magnadddddddddddddd',
      id: 1,
    },
    {
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, tempore ab libero nulla ',
      id: 2,
    },
  ];
}
