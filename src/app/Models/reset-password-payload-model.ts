import { ResetPasswordFormModel } from "./form/reset-password-form.model";

export interface ResetPasswordPayloadModel extends ResetPasswordFormModel {
    token: string;
}