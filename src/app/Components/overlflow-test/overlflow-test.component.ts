import { Component, ElementRef, inject, input } from '@angular/core';
import { OverflowTruncateDirective } from '../../Directives/overflow-truncate.directive';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-overlflow-test',
  standalone: true,
  imports: [OverflowTruncateDirective, NgClass, NgIf],
  templateUrl: './overlflow-test.component.html',
  styleUrl: './overlflow-test.component.scss'
})
export class OverlflowTestComponent {

  text = input<string>();
  textId = input<number>();



}