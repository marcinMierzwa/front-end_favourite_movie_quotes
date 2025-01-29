import { Component } from '@angular/core';
import {CdkAccordionModule} from '@angular/cdk/accordion';

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [CdkAccordionModule],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss'
})
export class AccordionComponent {
  items = ['Comments'];
  expandedIndex = 0;
}
