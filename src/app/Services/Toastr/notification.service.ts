import { inject, Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({
    providedIn: 'root'
})

export class NotificationService {
    private toastr: ToastrService = inject(ToastrService);

    showError(message: string, title: string, config: any) {
        this.toastr.error(message, title, config);
      }
    
      showSuccess(message: string, title: string, config: any) {
        this.toastr.success(message, title, config);
      }
    }