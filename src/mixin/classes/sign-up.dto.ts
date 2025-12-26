export class SignUpDTO {
    name!: string;
    email!: string;
    password!: string;
    phone!: string;
    confirmPassword!: string;
    constructor(data: Partial<SignUpDTO>) {
        Object.assign(this, data);
    }
}