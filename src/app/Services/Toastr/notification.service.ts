import { inject, Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { toastrConfigDefault, toastrConfigSignUp } from "../../Config/toastr.config";

@Injectable({
    providedIn: 'root'
})

export class NotificationService {
    private toastr: ToastrService = inject(ToastrService);

    // showError(message: string) {
    //     this.toastr.error(message, 'Błąd', toastrConfigError);
    //   }
    
      showSuccess(message: string, title: string, config: any) {
        this.toastr.success(message, title, config);
      }}