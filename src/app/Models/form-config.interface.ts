export interface GroupValidationRule {
  validator: 'passwordsMatch'; 
  errorMsg: string;
}

export interface FormConfig {
    heading: string;
    submitLabel: string;
    inputsConfig : InputConfig[],
    groupValidation?: GroupValidationRule[];
}

export interface InputConfig {
    id: string;
    type: string;
    name: string;
    placeholder: string;
    ariaLabel: string;
    isShowPasswordVisible: boolean;
    isContentIncrypted: boolean;
    validation: ValidationRule[];
    
}

export interface ValidationRule {
    validator: 'required' | 'email' | 'minLength' | 'maxLength' | 'pattern' | 'passwordsMismatch';
    value?: number | string; 
    errorMsg: string;
  }