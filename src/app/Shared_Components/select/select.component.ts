import { Component, input } from '@angular/core';
import { FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CharacterName } from '../../Models/character-name.interface';
import { MovieName } from '../../Models/movie-name.interface';


@Component({
  selector: 'app-select',
  standalone: true,
  imports: [MatSelectModule, MatInputModule, FormsModule, MatFormFieldModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {

  readonly selectOptions = input.required<CharacterName[] | MovieName[]>();
  readonly selectHeading = input.required<string>();

  onSelectionChange(event: MatSelectChange) {
    console.log(event.value);
    
  }
  }
