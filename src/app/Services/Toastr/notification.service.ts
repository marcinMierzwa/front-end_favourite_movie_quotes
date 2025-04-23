import { inject, Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { toastrConfigDefault } from "../../Config/toastr.config";

@Injectable({
    providedIn: 'root'
})

export class NotificationService {
    private toastr: ToastrService = inject(ToastrService);

    showToast() {
        this.toastr.success('test message', 'test title', toastrConfigDefault);
      }
}