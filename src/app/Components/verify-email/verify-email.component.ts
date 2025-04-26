import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../Services/Auth/auth.service';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  template: ``,
  imports: [],
})
export class VerfifyEmailComponent implements OnInit {
  private readonly authService: AuthService = inject(AuthService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

    ngOnInit(): void {
      const token = this.activatedRoute.snapshot.queryParamMap.get('token');      
      if (token) {
        this.authService.verifyEmailAddress(token);
      }
    }
  
}
