export class ResetPasswordModel {
  resetToken!: string;

  message!: string | null;
  hasError: boolean = false;
}
