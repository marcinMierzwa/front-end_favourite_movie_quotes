export interface FormConfig {
    heading: string;
    submitLabel: string;
    inputsConfig : InputConfig[]
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
    validator: 'required' | 'email' | 'minLength' | 'maxLength' | 'pattern';
    value?: number | string; 
    errorMsg: string;
  }