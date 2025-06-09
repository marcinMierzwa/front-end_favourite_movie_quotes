import { ForgotPasswordFormModel } from "./forgot-password-form-model";
import { LogInFormModel } from "./login-form-model";
import { ResetPasswordFormModel } from "./reset-password-form.model";
import { SignUpFormModel } from "./signup-form-model";

export type SubmitForm = SignUpFormModel | LogInFormModel | ForgotPasswordFormModel | ResetPasswordFormModel