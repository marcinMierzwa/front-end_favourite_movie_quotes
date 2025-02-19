import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-sort',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sort.component.html',
  styleUrl: './sort.component.scss'
})
export class SortComponent {
private formBuilder:NonNullableFormBuilder = inject(NonNullableFormBuilder);

readonly buttonsForm: FormGroup = this.formBuilder.group({
  likes: 'most', 
  sort: 'asc'    
});

onSubmit() {
  const sortValue = this.buttonsForm.getRawValue();
}

}
