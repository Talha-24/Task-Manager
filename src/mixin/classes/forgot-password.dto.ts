export class ForgotPasswordDTO {
    email!: string;
    constructor(data: Partial<ForgotPasswordDTO>) {
        Object.assign(this, data);
    }
}
export class ResetPasswordDTO{
    token!:string;
    password!:string;
    confirmPassword!:string;
    constructor(data:Partial<ResetPasswordDTO>){
        Object.assign(this,data);
    }
}