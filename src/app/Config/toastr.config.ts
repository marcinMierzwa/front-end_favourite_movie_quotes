import { IndividualConfig } from 'ngx-toastr';

export const toastrConfigDefault = {
    positionClass: 'toast-center',
    preventDuplicates: true,
    timeOut: 3000,
    closeButton: true,
    tapToDismiss: true,
    enableHtml: true,
  };

  export const toastrConfigSignUp = {
    positionClass: 'toast-center',
    preventDuplicates: true,
    disableTimeOut: true,
    closeButton: true,
    tapToDismiss: true,
    enableHtml: true,
  };

  export const toastrConfigVerify = {
    positionClass: 'toast-center',
    preventDuplicates: true,
    timeOut: 9000,
    closeButton: true,
    tapToDismiss: true,
    enableHtml: true,
  };


  // export const ToastrConfigs: Record<'default' | 'signUp', Partial<IndividualConfig<any>>> = {
  //   default: toastrConfigDefault,
  //   signUp: toastrConfigSignUp,
  // };