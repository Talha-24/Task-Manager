export class SignInDTO {
    email!: string;
    password!: string;
    constructor(data: Partial<SignInDTO>) {
        Object.assign(this, data);
    }
}