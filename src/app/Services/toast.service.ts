import { Injectable } from "@angular/core";
import * as bootstrap from 'bootstrap';

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    showToast(toastElement: HTMLElement) {
        const toast = bootstrap.Toast.getOrCreateInstance(toastElement);
        toast.show();
      }}