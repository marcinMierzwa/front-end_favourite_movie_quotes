import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly toastr: ToastrService = inject(ToastrService);

  showError(message: string, title: string, config: any): void {
    this.toastr.error(message, title, config);
  }

  showSuccess(message: string, title: string, config: any): void {
    this.toastr.success(message, title, config);
  }

  showInfo(message: string, title: string, config: any) {
    return this.toastr.info(message, title, config)
  }
}
